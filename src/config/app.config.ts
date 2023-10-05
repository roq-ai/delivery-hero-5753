interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Restaurant Manager'],
  customerRoles: ['Customer'],
  tenantRoles: ['Restaurant Manager'],
  tenantName: 'Restaurant',
  applicationName: 'Delivery Hero',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [
    'Edit personal information',
    'Create and manage orders',
    'Review restaurants',
    'Update preferred cuisine',
  ],
  ownerAbilities: ['Manage restaurant', 'Manage menus', 'Manage orders', 'Manage ratings'],
  getQuoteUrl: 'https://app.roq.ai/proposal/6d347e7e-f7f9-432c-896f-3ce5bd44b131',
};
