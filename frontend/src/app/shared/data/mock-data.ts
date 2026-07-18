export const businessProfile = {
  id: 'biz-001',
  name: 'Northstar Bakery',
  slug: 'northstar-bakery',
  type: 'Bakery',
  owner: 'Lina Haddad',
  email: 'lina@northstar.example',
  phone: '+212 6 00 00 00 00',
  address: 'Rue de la Paix, Casablanca'
};

export const employeeProfiles = [
  { id: 'emp-001', name: 'Mina El Idrissi', role: 'Owner', pin: '1234', status: 'Active' },
  { id: 'emp-002', name: 'Youssef Rami', role: 'Manager', pin: '4321', status: 'Active' },
  { id: 'emp-003', name: 'Sara Benali', role: 'Cashier', pin: '9999', status: 'Away' },
  { id: 'emp-000', name: 'Test User', role: 'Tester', pin: '0000', status: 'Active' }
];

export const inventoryItems = [
  { id: 1, name: 'Flour', category: 'Dry Goods', quantity: 84, unit: 'kg', min: 20, cost: 12, status: 'Healthy', image: 'https://picsum.photos/seed/flour/100/100' },
  { id: 2, name: 'Butter', category: 'Dairy', quantity: 7, unit: 'kg', min: 10, cost: 28, status: 'Low Stock' },
  { id: 3, name: 'Chocolate', category: 'Ingredients', quantity: 15, unit: 'kg', min: 8, cost: 18, status: 'Healthy', image: 'https://picsum.photos/seed/chocolate/100/100' },
  { id: 4, name: 'Milk', category: 'Dairy', quantity: 3, unit: 'l', min: 12, cost: 9, status: 'Critical' },
  { id: 5, name: 'Sugar', category: 'Dry Goods', quantity: 45, unit: 'kg', min: 15, cost: 8, status: 'Healthy', image: 'https://picsum.photos/seed/sugar/100/100' },
  { id: 6, name: 'Eggs', category: 'Dairy', quantity: 120, unit: 'units', min: 60, cost: 2, status: 'Healthy' }
];

export const products = [
  { id: 1, name: 'Sourdough Loaf', category: 'Bakery', price: 38, stock: 24, status: 'Available', margin: 64, image: 'https://picsum.photos/seed/sourdough/100/100' },
  { id: 2, name: 'Cinnamon Bun', category: 'Pastry', price: 24, stock: 18, status: 'Available', margin: 58 },
  { id: 3, name: 'Flat White', category: 'Coffee', price: 32, stock: 9, status: 'Low Stock', margin: 71, image: 'https://picsum.photos/seed/flatwhite/100/100' },
  { id: 4, name: 'Chocolate Croissant', category: 'Pastry', price: 28, stock: 15, status: 'Available', margin: 62 },
  { id: 5, name: 'Cold Brew', category: 'Coffee', price: 35, stock: 12, status: 'Available', margin: 75 }
];

export const salesData = [
  { day: 'Mon', revenue: 5200, target: 4200 },
  { day: 'Tue', revenue: 6100, target: 4800 },
  { day: 'Wed', revenue: 6900, target: 5300 },
  { day: 'Thu', revenue: 7800, target: 5600 },
  { day: 'Fri', revenue: 9400, target: 6700 },
  { day: 'Sat', revenue: 11200, target: 8100 }
];

export const monthlyProfit = [
  { month: 'Jan', profit: 18200, expenses: 28400 },
  { month: 'Feb', profit: 19600, expenses: 27100 },
  { month: 'Mar', profit: 21400, expenses: 29300 },
  { month: 'Apr', profit: 22800, expenses: 30500 },
  { month: 'May', profit: 25300, expenses: 31800 },
  { month: 'Jun', profit: 24100, expenses: 32600 }
];

export const purchaseOrders = [
  { id: 'PO-104', supplier: 'Golden Grain', total: 4200, status: 'Pending', eta: 'Today' },
  { id: 'PO-105', supplier: 'Aqua Dairy', total: 1800, status: 'Received', eta: 'Delivered' },
  { id: 'PO-106', supplier: 'Brew & Bean', total: 860, status: 'Draft', eta: 'Tomorrow' },
  { id: 'PO-107', supplier: 'Fresh Farms', total: 3200, status: 'Pending', eta: '2 days' }
];

export const notifications = [
  { id: 1, title: 'Low stock alert', message: 'Butter now below the safety threshold.', category: 'Inventory', unread: true, time: '3m ago' },
  { id: 2, title: 'Procurement review', message: 'Three supplier approvals are waiting for owner review.', category: 'Procurement', unread: true, time: '12m ago' },
  { id: 3, title: 'Sales surge', message: 'Weekend pastry demand is trending 18% above plan.', category: 'Sales', unread: false, time: '1h ago' },
  { id: 4, title: 'Employee check-in', message: 'Sara clocked in for the afternoon rush.', category: 'Employees', unread: false, time: '2h ago' },
  { id: 5, title: 'Inventory count', message: 'End-of-day count completed. All matches.', category: 'Inventory', unread: true, time: '4h ago' },
  { id: 6, title: 'Order ready', message: 'PO-104 from Golden Grain has arrived.', category: 'Procurement', unread: false, time: '5h ago' }
];

export const analyticsCards = [
  { label: 'Revenue', value: 'MAD 84.2k', delta: '+12.4%', detail: 'vs last week' },
  { label: 'Profit', value: 'MAD 24.8k', delta: '+8.1%', detail: 'healthy margin' },
  { label: 'Inventory Value', value: 'MAD 38.6k', delta: '-2.2%', detail: '3 SKUs low' },
  { label: 'Sales Today', value: '128 orders', delta: '+5.6%', detail: 'peak at 11:00' }
];

export const ownerAnalyticsCards = [
  { label: 'Revenue', value: 'MAD 84.2k', delta: '+12.4%', detail: 'vs last week' },
  { label: 'Profit', value: 'MAD 24.8k', delta: '+8.1%', detail: 'healthy margin' },
  { label: 'Expenses', value: 'MAD 59.4k', delta: '+3.2%', detail: 'vs last week' },
  { label: 'Inventory Value', value: 'MAD 38.6k', delta: '-2.2%', detail: '3 SKUs low' },
  { label: 'Employees', value: '12', delta: '0', detail: 'active staff' },
  { label: 'Avg Order Value', value: 'MAD 42', delta: '+5.1%', detail: 'vs last week' }
];

export const employeeTasks = [
  { id: 1, task: 'Restock butter in fridge', priority: 'High', due: 'Today', assignee: 'Sara' },
  { id: 2, task: 'Prepare sourdough starter', priority: 'Medium', due: 'Today', assignee: 'Mina' },
  { id: 3, task: 'Clean espresso machine', priority: 'Low', due: 'Tomorrow', assignee: 'Youssef' },
  { id: 4, task: 'Count end-of-day inventory', priority: 'Medium', due: 'Today', assignee: 'Sara' }
];

export const expiringProducts = [
  { id: 1, name: 'Milk', expires: 'Today', quantity: '4 units' },
  { id: 2, name: 'Cream', expires: 'Tomorrow', quantity: '2 units' },
  { id: 3, name: 'Yogurt', expires: 'In 3 days', quantity: '6 units' }
];

export const employeeQuickActions = [
  { label: 'Count Inventory', icon: '📋', route: '/inventory' },
  { label: 'Check Products', icon: '🥐', route: '/products' },
  { label: 'View Orders', icon: '📦', route: '/orders' },
  { label: 'Report Issue', icon: '⚠️', route: '/notifications' }
];

export const orders = [
  { id: 'ORD-001', customer: 'Walk-in', items: 3, total: 94, status: 'Completed', payment: 'Card', time: '10:23 AM', date: 'Today' },
  { id: 'ORD-002', customer: 'Table 4', items: 2, total: 62, status: 'In Progress', payment: 'Cash', time: '10:45 AM', date: 'Today' },
  { id: 'ORD-003', customer: 'Online — Sarah K.', items: 4, total: 138, status: 'Pending', payment: 'Card', time: '11:00 AM', date: 'Today' },
  { id: 'ORD-004', customer: 'Walk-in', items: 1, total: 32, status: 'Completed', payment: 'Mobile', time: '11:15 AM', date: 'Today' },
  { id: 'ORD-005', customer: 'Table 7', items: 5, total: 186, status: 'In Progress', payment: 'Card', time: '11:30 AM', date: 'Today' },
  { id: 'ORD-006', customer: 'Delivery — Ahmed', items: 2, total: 56, status: 'Pending', payment: 'Card', time: '11:45 AM', date: 'Today' },
  { id: 'ORD-007', customer: 'Walk-in', items: 3, total: 78, status: 'Completed', payment: 'Cash', time: '12:00 PM', date: 'Today' },
  { id: 'ORD-008', customer: 'Table 2', items: 4, total: 112, status: 'In Progress', payment: 'Card', time: '12:20 PM', date: 'Today' }
];

export const payments = [
  { id: 'PAY-001', orderId: 'ORD-001', method: 'Card', amount: 94, status: 'Settled', date: 'Today', fee: 2.82, net: 91.18 },
  { id: 'PAY-002', orderId: 'ORD-002', method: 'Cash', amount: 62, status: 'Settled', date: 'Today', fee: 0, net: 62 },
  { id: 'PAY-003', orderId: 'ORD-003', method: 'Card', amount: 138, status: 'Pending', date: 'Today', fee: 4.14, net: 133.86 },
  { id: 'PAY-004', orderId: 'ORD-004', method: 'Mobile', amount: 32, status: 'Settled', date: 'Today', fee: 0.96, net: 31.04 },
  { id: 'PAY-005', orderId: 'ORD-005', method: 'Card', amount: 186, status: 'Pending', date: 'Today', fee: 5.58, net: 180.42 },
  { id: 'PAY-006', orderId: 'ORD-006', method: 'Card', amount: 56, status: 'Pending', date: 'Today', fee: 1.68, net: 54.32 },
  { id: 'PAY-007', orderId: 'ORD-007', method: 'Cash', amount: 78, status: 'Settled', date: 'Today', fee: 0, net: 78 },
  { id: 'PAY-008', orderId: 'ORD-008', method: 'Card', amount: 112, status: 'Settled', date: 'Today', fee: 3.36, net: 108.64 }
];

export const menus = [
  {
    id: 1, name: 'Classic Breakfast', category: 'Breakfast', price: 45, status: 'Active',
    items: ['Sourdough Toast', 'Eggs', 'Butter', 'Coffee']
  },
  {
    id: 2, name: 'Pastry Box', category: 'Pastry', price: 68, status: 'Active',
    items: ['Cinnamon Bun', 'Chocolate Croissant', 'Flat White']
  },
  {
    id: 3, name: 'Lunch Special', category: 'Lunch', price: 82, status: 'Active',
    items: ['Sourdough Loaf', 'Soup', 'Cold Brew']
  },
  {
    id: 4, name: 'Coffee Break', category: 'Coffee', price: 42, status: 'Inactive',
    items: ['Flat White', 'Cinnamon Bun']
  },
  {
    id: 5, name: 'Family Box', category: 'Bakery', price: 120, status: 'Active',
    items: ['Sourdough Loaf', 'Chocolate Croissant', 'Cinnamon Bun', 'Cold Brew']
  }
];

export const aiInsights = [
  { insight: 'Butter demand expected to rise 15% next week. Consider ordering 10kg extra.', type: 'forecast' },
  { insight: 'Sourdough Loaf has 64% margin — your most profitable item. Promote it.', type: 'recommendation' },
  { insight: 'Employee productivity up 22% this month compared to last.', type: 'trend' }
];
