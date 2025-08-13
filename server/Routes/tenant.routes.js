const express = require('express');
const router = express.Router();
const TenantController = require('../Controllers/tenant.controller');
const { authenticateToken } = require('../Middlewares/auth.middleware');

// Register new tenant (public route)
router.post('/register', TenantController.registerTenant);

// Protected routes
router.use(authenticateToken);

// Get tenant information
router.get('/:tenantId', TenantController.getTenant);

// Get tenant statistics
router.get('/:tenantId/stats', TenantController.getTenantStats);

// Check student limit
router.get('/:tenantId/check-limit', TenantController.checkStudentLimit);

// System admin routes
router.get('/', TenantController.getAllTenants); // Get all tenants
router.put('/:tenantId/subscription', TenantController.updateSubscription); // Update subscription

module.exports = router;
