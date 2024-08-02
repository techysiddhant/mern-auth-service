import express, {
    NextFunction,
    Request,
    RequestHandler,
    Response,
} from "express";
import { Tenant } from "../entity/Tenant";
import { AppDataSource } from "../config/data-source";
import logger from "../config/logger";
import authenticate from "../middleware/authenticate";
import { canAccess } from "../middleware/canAccess";
import { Roles } from "../constants";
import { TenantService } from "../services/TenantService";
import { TenantController } from "../controllers/TenantController";
import tenantValidator from "../validators/tenant-validator";
import listUsersValidator from "../validators/list-users-validator";
import { CreateTenantRequest } from "../types";

const router = express.Router();
const tenantRepository = AppDataSource.getRepository(Tenant);
const tenantService = new TenantService(tenantRepository);
const tenantController = new TenantController(tenantService, logger);
router.post(
    "/",
    authenticate as RequestHandler,
    canAccess([Roles.ADMIN]),
    (async (req, res, next) => {
        await tenantController.create(req, res, next);
    }) as RequestHandler,
);
router.patch(
    "/:id",
    authenticate as RequestHandler,
    canAccess([Roles.ADMIN]),
    tenantValidator,
    (req: CreateTenantRequest, res: Response, next: NextFunction) =>
        tenantController.update(req, res, next) as unknown as RequestHandler,
);
router.get(
    "/",
    listUsersValidator,
    (req: Request, res: Response, next: NextFunction) =>
        tenantController.getAll(req, res, next) as unknown as RequestHandler,
);
router.get(
    "/:id",
    authenticate as RequestHandler,
    canAccess([Roles.ADMIN]),
    (req, res, next) =>
        tenantController.getOne(req, res, next) as unknown as RequestHandler,
);
router.delete(
    "/:id",
    authenticate as RequestHandler,
    canAccess([Roles.ADMIN]),
    (req, res, next) =>
        tenantController.destroy(req, res, next) as unknown as RequestHandler,
);
export default router;
