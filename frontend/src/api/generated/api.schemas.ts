export interface HealthStatus {
  status: string;
}

export interface DashboardSummary {
  activeClients: number;
  activeProjects: number;
  monthlyRevenue: number;
  pendingInvoices: number;
  pendingInvoicesAmount?: number;
  registeredHours: number;
  totalIncome: number;
  totalExpenses: number;
  profit: number;
}

export interface ChartDataPoint {
  month: string;
  revenue: number;
  expenses: number;
  profit?: number;
}

export interface ActivityItem {
  id: number;
  type: string;
  description: string;

  entityId?: number | null;

  entityType?: string | null;
  createdAt: string;
}

export type ClientStatus = typeof ClientStatus[keyof typeof ClientStatus];


export const ClientStatus = {
  active: 'active',
  inactive: 'inactive',
} as const;

export interface Client {
  id: number;
  name: string;

  company?: string | null;
  email: string;

  phone?: string | null;

  address?: string | null;

  city?: string | null;

  country?: string | null;

  taxId?: string | null;
  status: ClientStatus;

  notes?: string | null;
  createdAt: string;
  updatedAt?: string;
}

export interface ClientList {
  data: Client[];
  total: number;
  page: number;
  limit: number;
}

export type ClientInputStatus = typeof ClientInputStatus[keyof typeof ClientInputStatus];


export const ClientInputStatus = {
  active: 'active',
  inactive: 'inactive',
} as const;

export interface ClientInput {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  taxId?: string;
  status?: ClientInputStatus;
  notes?: string;
}

export type ClientUpdateStatus = typeof ClientUpdateStatus[keyof typeof ClientUpdateStatus];


export const ClientUpdateStatus = {
  active: 'active',
  inactive: 'inactive',
} as const;

export interface ClientUpdate {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  taxId?: string;
  status?: ClientUpdateStatus;
  notes?: string;
}

export type ProjectStatus = typeof ProjectStatus[keyof typeof ProjectStatus];


export const ProjectStatus = {
  planning: 'planning',
  active: 'active',
  on_hold: 'on_hold',
  completed: 'completed',
  cancelled: 'cancelled',
} as const;

export type ProjectPriority = typeof ProjectPriority[keyof typeof ProjectPriority];


export const ProjectPriority = {
  low: 'low',
  medium: 'medium',
  high: 'high',
  urgent: 'urgent',
} as const;

export interface Project {
  id: number;
  name: string;

  description?: string | null;

  clientId?: number | null;

  clientName?: string | null;
  status: ProjectStatus;
  priority: ProjectPriority;
  progress: number;

  budget?: number | null;

  deadline?: string | null;

  startDate?: string | null;
  createdAt: string;
  updatedAt?: string;
}

export interface ProjectList {
  data: Project[];
  total: number;
  page: number;
  limit: number;
}

export type ProjectInputStatus = typeof ProjectInputStatus[keyof typeof ProjectInputStatus];


export const ProjectInputStatus = {
  planning: 'planning',
  active: 'active',
  on_hold: 'on_hold',
  completed: 'completed',
  cancelled: 'cancelled',
} as const;

export type ProjectInputPriority = typeof ProjectInputPriority[keyof typeof ProjectInputPriority];


export const ProjectInputPriority = {
  low: 'low',
  medium: 'medium',
  high: 'high',
  urgent: 'urgent',
} as const;

export interface ProjectInput {
  name: string;
  description?: string;
  clientId?: number;
  status?: ProjectInputStatus;
  priority?: ProjectInputPriority;
  progress?: number;
  budget?: number;
  deadline?: string;
  startDate?: string;
}

export type ProjectUpdateStatus = typeof ProjectUpdateStatus[keyof typeof ProjectUpdateStatus];


export const ProjectUpdateStatus = {
  planning: 'planning',
  active: 'active',
  on_hold: 'on_hold',
  completed: 'completed',
  cancelled: 'cancelled',
} as const;

export type ProjectUpdatePriority = typeof ProjectUpdatePriority[keyof typeof ProjectUpdatePriority];


export const ProjectUpdatePriority = {
  low: 'low',
  medium: 'medium',
  high: 'high',
  urgent: 'urgent',
} as const;

export interface ProjectUpdate {
  name?: string;
  description?: string;
  clientId?: number;
  status?: ProjectUpdateStatus;
  priority?: ProjectUpdatePriority;
  progress?: number;
  budget?: number;
  deadline?: string;
  startDate?: string;
}

export interface ProjectStats {
  planning: number;
  active: number;
  on_hold: number;
  completed: number;
  cancelled: number;
  total: number;
}

export type TaskStatus = typeof TaskStatus[keyof typeof TaskStatus];


export const TaskStatus = {
  backlog: 'backlog',
  todo: 'todo',
  in_progress: 'in_progress',
  in_review: 'in_review',
  done: 'done',
} as const;

export type TaskPriority = typeof TaskPriority[keyof typeof TaskPriority];


export const TaskPriority = {
  low: 'low',
  medium: 'medium',
  high: 'high',
  urgent: 'urgent',
} as const;

export interface Task {
  id: number;
  title: string;

  description?: string | null;

  projectId?: number | null;

  projectName?: string | null;

  assigneeId?: number | null;

  assigneeName?: string | null;
  status: TaskStatus;
  priority: TaskPriority;

  dueDate?: string | null;

  estimatedHours?: number | null;
  createdAt: string;
  updatedAt?: string;
}

export interface TaskList {
  data: Task[];
  total: number;
  page: number;
  limit: number;
}

export type TaskInputStatus = typeof TaskInputStatus[keyof typeof TaskInputStatus];


export const TaskInputStatus = {
  backlog: 'backlog',
  todo: 'todo',
  in_progress: 'in_progress',
  in_review: 'in_review',
  done: 'done',
} as const;

export type TaskInputPriority = typeof TaskInputPriority[keyof typeof TaskInputPriority];


export const TaskInputPriority = {
  low: 'low',
  medium: 'medium',
  high: 'high',
  urgent: 'urgent',
} as const;

export interface TaskInput {
  title: string;
  description?: string;
  projectId?: number;
  assigneeId?: number;
  status?: TaskInputStatus;
  priority?: TaskInputPriority;
  dueDate?: string;
  estimatedHours?: number;
}

export type TaskUpdateStatus = typeof TaskUpdateStatus[keyof typeof TaskUpdateStatus];


export const TaskUpdateStatus = {
  backlog: 'backlog',
  todo: 'todo',
  in_progress: 'in_progress',
  in_review: 'in_review',
  done: 'done',
} as const;

export type TaskUpdatePriority = typeof TaskUpdatePriority[keyof typeof TaskUpdatePriority];


export const TaskUpdatePriority = {
  low: 'low',
  medium: 'medium',
  high: 'high',
  urgent: 'urgent',
} as const;

export interface TaskUpdate {
  title?: string;
  description?: string;
  projectId?: number;
  assigneeId?: number;
  status?: TaskUpdateStatus;
  priority?: TaskUpdatePriority;
  dueDate?: string;
  estimatedHours?: number;
}

export type EmployeeStatus = typeof EmployeeStatus[keyof typeof EmployeeStatus];


export const EmployeeStatus = {
  active: 'active',
  inactive: 'inactive',
} as const;

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;

  phone?: string | null;

  department?: string | null;

  position?: string | null;
  status?: EmployeeStatus;

  hireDate?: string | null;
  createdAt: string;
  updatedAt?: string;
}

export interface EmployeeList {
  data: Employee[];
  total: number;
  page: number;
  limit: number;
}

export type EmployeeInputStatus = typeof EmployeeInputStatus[keyof typeof EmployeeInputStatus];


export const EmployeeInputStatus = {
  active: 'active',
  inactive: 'inactive',
} as const;

export interface EmployeeInput {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  department?: string;
  position?: string;
  status?: EmployeeInputStatus;
  hireDate?: string;
}

export type EmployeeUpdateStatus = typeof EmployeeUpdateStatus[keyof typeof EmployeeUpdateStatus];


export const EmployeeUpdateStatus = {
  active: 'active',
  inactive: 'inactive',
} as const;

export interface EmployeeUpdate {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  department?: string;
  position?: string;
  status?: EmployeeUpdateStatus;
  hireDate?: string;
}

export interface TimeEntry {
  id: number;
  employeeId: number;

  employeeName?: string | null;

  projectId?: number | null;

  projectName?: string | null;

  taskId?: number | null;

  description?: string | null;
  date: string;
  hours: number;
  createdAt: string;
}

export interface TimeEntryList {
  data: TimeEntry[];
  total: number;
  page: number;
  limit: number;
}

export interface TimeEntryInput {
  employeeId: number;
  projectId?: number;
  taskId?: number;
  description?: string;
  date: string;
  hours: number;
}

export interface TimeEntryUpdate {
  projectId?: number;
  taskId?: number;
  description?: string;
  date?: string;
  hours?: number;
}

export interface HoursByEntity {
  id: number;
  name: string;
  hours: number;
}

export interface TimeEntriesSummary {
  totalHours: number;
  byProject: HoursByEntity[];
  byEmployee: HoursByEntity[];
}

export interface QuoteItem {

  id?: number | null;
  description: string;
  quantity: number;
  unitPrice: number;
  discount?: number;
  tax?: number;
  total: number;
}

export type QuoteStatus = typeof QuoteStatus[keyof typeof QuoteStatus];


export const QuoteStatus = {
  draft: 'draft',
  sent: 'sent',
  approved: 'approved',
  rejected: 'rejected',
  expired: 'expired',
} as const;

export interface Quote {
  id: number;
  quoteNumber: string;

  clientId?: number | null;

  clientName?: string | null;

  projectId?: number | null;
  status: QuoteStatus;

  title?: string | null;

  notes?: string | null;

  validUntil?: string | null;
  subtotal: number;
  discount?: number;
  tax?: number;
  total: number;
  items?: QuoteItem[];
  createdAt: string;
  updatedAt?: string;
}

export interface QuoteList {
  data: Quote[];
  total: number;
  page: number;
  limit: number;
}

export type QuoteInputStatus = typeof QuoteInputStatus[keyof typeof QuoteInputStatus];


export const QuoteInputStatus = {
  draft: 'draft',
  sent: 'sent',
  approved: 'approved',
  rejected: 'rejected',
  expired: 'expired',
} as const;

export interface QuoteInput {
  clientId: number;
  projectId?: number;
  title?: string;
  notes?: string;
  validUntil?: string;
  status?: QuoteInputStatus;
  items?: QuoteItem[];
}

export type QuoteUpdateStatus = typeof QuoteUpdateStatus[keyof typeof QuoteUpdateStatus];


export const QuoteUpdateStatus = {
  draft: 'draft',
  sent: 'sent',
  approved: 'approved',
  rejected: 'rejected',
  expired: 'expired',
} as const;

export interface QuoteUpdate {
  clientId?: number;
  projectId?: number;
  title?: string;
  notes?: string;
  validUntil?: string;
  status?: QuoteUpdateStatus;
  items?: QuoteItem[];
}

export type InvoiceStatus = typeof InvoiceStatus[keyof typeof InvoiceStatus];


export const InvoiceStatus = {
  draft: 'draft',
  sent: 'sent',
  pending: 'pending',
  paid: 'paid',
  partial: 'partial',
  cancelled: 'cancelled',
} as const;

export interface Invoice {
  id: number;
  invoiceNumber: string;

  clientId?: number | null;

  clientName?: string | null;

  projectId?: number | null;

  quoteId?: number | null;
  status: InvoiceStatus;

  title?: string | null;

  notes?: string | null;

  dueDate?: string | null;
  subtotal: number;
  discount?: number;
  tax?: number;
  total: number;
  paidAmount?: number;
  items?: QuoteItem[];
  createdAt: string;
  updatedAt?: string;
}

export interface InvoiceList {
  data: Invoice[];
  total: number;
  page: number;
  limit: number;
}

export type InvoiceInputStatus = typeof InvoiceInputStatus[keyof typeof InvoiceInputStatus];


export const InvoiceInputStatus = {
  draft: 'draft',
  sent: 'sent',
  pending: 'pending',
  paid: 'paid',
  partial: 'partial',
  cancelled: 'cancelled',
} as const;

export interface InvoiceInput {
  clientId: number;
  projectId?: number;
  title?: string;
  notes?: string;
  dueDate?: string;
  status?: InvoiceInputStatus;
  items?: QuoteItem[];
}

export type InvoiceUpdateStatus = typeof InvoiceUpdateStatus[keyof typeof InvoiceUpdateStatus];


export const InvoiceUpdateStatus = {
  draft: 'draft',
  sent: 'sent',
  pending: 'pending',
  paid: 'paid',
  partial: 'partial',
  cancelled: 'cancelled',
} as const;

export interface InvoiceUpdate {
  clientId?: number;
  projectId?: number;
  title?: string;
  notes?: string;
  dueDate?: string;
  status?: InvoiceUpdateStatus;
  paidAmount?: number;
  items?: QuoteItem[];
}

export interface InvoiceStats {
  totalPaid: number;
  totalPending: number;
  totalOverdue: number;
  totalDraft: number;
  countPaid?: number;
  countPending?: number;
  countOverdue?: number;
}

export interface Expense {
  id: number;
  description: string;
  amount: number;
  date: string;
  category: string;

  supplier?: string | null;

  notes?: string | null;

  projectId?: number | null;

  projectName?: string | null;
  createdAt: string;
}

export interface ExpenseList {
  data: Expense[];
  total: number;
  page: number;
  limit: number;
}

export interface ExpenseInput {
  description: string;
  amount: number;
  date: string;
  category: string;
  supplier?: string;
  notes?: string;
  projectId?: number;
}

export interface ExpenseUpdate {
  description?: string;
  amount?: number;
  date?: string;
  category?: string;
  supplier?: string;
  notes?: string;
  projectId?: number;
}

export interface ExpenseStat {
  category: string;
  total: number;
  count: number;
}

export interface FinancialReport {
  revenue: number;
  expenses: number;
  profit: number;
  profitMargin?: number;
  byMonth: ChartDataPoint[];
}

export interface ProjectsReport {
  total: number;
  byStatus: ExpenseStat[];
  byPriority: ExpenseStat[];
  completionRate: number;
  avgProgress?: number;
}

export interface EmployeesReport {
  total: number;
  active: number;
  totalHours: number;
  avgHoursPerEmployee?: number;
  byDepartment: ExpenseStat[];
  topEmployees?: HoursByEntity[];
}

export type GetRevenueChartParams = {
months?: number;
};

export type ListClientsParams = {
search?: string;
status?: string;
page?: number;
limit?: number;
};

export type ListProjectsParams = {
search?: string;
status?: string;
clientId?: number;
page?: number;
limit?: number;
};

export type ListTasksParams = {
search?: string;
status?: string;
priority?: string;
projectId?: number;
assigneeId?: number;
page?: number;
limit?: number;
};

export type ListEmployeesParams = {
search?: string;
department?: string;
page?: number;
limit?: number;
};

export type ListTimeEntriesParams = {
employeeId?: number;
projectId?: number;
dateFrom?: string;
dateTo?: string;
page?: number;
limit?: number;
};

export type GetTimeEntriesSummaryParams = {
period?: GetTimeEntriesSummaryPeriod;
};

export type GetTimeEntriesSummaryPeriod = typeof GetTimeEntriesSummaryPeriod[keyof typeof GetTimeEntriesSummaryPeriod];


export const GetTimeEntriesSummaryPeriod = {
  day: 'day',
  week: 'week',
  month: 'month',
} as const;

export type ListQuotesParams = {
search?: string;
status?: string;
clientId?: number;
page?: number;
limit?: number;
};

export type ListInvoicesParams = {
search?: string;
status?: string;
clientId?: number;
page?: number;
limit?: number;
};

export type ListExpensesParams = {
search?: string;
category?: string;
dateFrom?: string;
dateTo?: string;
page?: number;
limit?: number;
};

export type GetFinancialReportParams = {
dateFrom?: string;
dateTo?: string;
};

export type GetProjectsReportParams = {
dateFrom?: string;
dateTo?: string;
};

export type GetEmployeesReportParams = {
dateFrom?: string;
dateTo?: string;
};

