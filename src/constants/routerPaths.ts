export const ROUTER_PATHS = {
    TERMNINAL: '/',
    WINDOWS: '/windows',
    CATEGORIES: '/categories',
    SERVICES: '/categories/:categoryId(\\d+)/services',
    
    EMPLOYE: '/employe',
    EMPLOYE_WORKSPACE: '/employe/workspace/:windowId(\\d+)',
    
    ADMINISTRATOR: '/administrator',
    ADMINISTRATOR_CATEGORIES: '/administrator/categories',
    ADMINISTRATOR_CATEGORY: '/administrator/categories/:categoryId(\\d+)',
    ADMINISTRATOR_CATEGORY_EDIT: '/administrator/categories/:categoryId(\\d+)/edit',
    ADMINISTRATOR_SERVICES: '/administrator/categories/:categoryId(\\d+)/services/',
    ADMINISTRATOR_SERVICE: '/administrator/categories/:categoryId(\\d+)/services/:serviceId(\\d+)',
    ADMINISTRATOR_SERVICE_EDIT: '/administrator/categories/:categoryId(\\d+)/services/:serviceId(\\d+)/edit',
}