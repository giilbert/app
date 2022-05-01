import { AuditLogAction, AuditLogEntity, Perm } from "@prisma/client";
import { route, Response, Parser } from "typera-express";
import {
  authenticated,
  authorized,
  incredible,
} from "../middlewares/authentication";
import { prisma } from "../util/prisma";
import { audit } from "../util/audit";
import * as t from "io-ts";

export module UserController {
  export const getUsers = route
    .get("/")
    .use(authenticated(null))
    .use(incredible)
    .handler(async () => {
      const users = await prisma.user.findMany();

      return Response.ok(users);
    });

  export const getUser = route
    .get("/:id")
    .use(authenticated(null))
    .use(incredible)
    .handler(async ({ routeParams }) => {
      const user = await prisma.user.findUnique({
        where: { id: routeParams.id },
      });

      return Response.ok(user);
    });

  export const getTasks = route
    .get("/tasks")
    .use(authenticated(null))
    .use(authorized(Perm.VIEW_EVENT_TASK))
    .handler(async ({ user }) => {
      const tasks = await prisma.eventTask.findMany({
        where: { assignees: { some: { userId: user.id } } },
        include: {
          event: {
            select: {
              name: true,
              slug: true,
            },
          },
        },
        orderBy: [{ dueDate: "asc" }, { name: "asc" }],
      });

      return Response.ok(tasks);
    });

  export const getMetadata = route
    .get("/metadata")
    .use(authenticated(null))
    .handler(async ({ user }) => {
      // redeemed links and user metadata
      const metadataWithEventLink = await prisma.user.findFirst({
        where: { id: user.id },
        select: {
          userMetadata: true,
          eventLinkRedeem: {
            include: {
              eventLink: {
                include: {
                  metadata: true,
                },
              },
            },
          },
        },
      });

      // hack together what the query type expects it to be
      return Response.ok([
        {
          metadata: metadataWithEventLink?.userMetadata || [],
          linkRedeem: metadataWithEventLink?.eventLinkRedeem || [],
        },
      ]);
    });

  export const editMetadata = route
    .patch("/metadata")
    .use(authenticated(null))
    .use(authorized(Perm.MANAGE_USERS))
    .use(
      Parser.body(
        t.type({
          userId: t.string,
          key: t.string,
          value: t.number,
        }),
      ),
    )
    .handler(async ({ body, user }) => {
      const metadata = await prisma.userMetadata.update({
        where: {
          key_userId: {
            key: body.key,
            userId: body.userId,
          },
        },
        data: {
          value: body.value,
        },
        include: {
          user: {
            select: { name: true },
          },
        },
      });

      await audit({
        author: user,
        action: AuditLogAction.UPDATE,
        entity: AuditLogEntity.USER_METADATA,
        description: `Updated ${metadata.user.name}'s ${body.key} to ${body.value}`,
      });

      return Response.ok(metadata);
    });

  // export const getBranchMember = route
  //   .get("/branch/:id")
  //   .use(authenticated(null))
  //   .handler(async ({ routeParams, user }) => {
  //     const branchMember = await prisma.branchMember.findUnique({
  //       where: {
  //         userId_branchId: {
  //           userId: user.id,
  //           branchId: routeParams.id,
  //         },
  //       },
  //     });

  //     return Response.ok(branchMember);
  //   });

  export const deleteUser = route
    .delete("/:id")
    .use(authenticated(null))
    .use(incredible)
    .handler(async ({ routeParams, user: terminator }) => {
      const user = await prisma.user.delete({
        where: { id: routeParams.id },
      });

      await audit({
        author: terminator,
        action: AuditLogAction.DELETE,
        entity: AuditLogEntity.USER,
        description: `${user.name} has been terminated!`,
      });
      return Response.ok(user);
    });
}
