import { router } from "typera-express";
import { BranchController } from "../controllers/branch-controller";

export const branchRouts = router(
  BranchController.getBranch,
  BranchController.createBranch,
  BranchController.editBranch,
  BranchController.deleteBranch,
).handler();
