import {
  useMutation,
  useQuery
} from '@tanstack/react-query';
import type {
  MutationFunction,
  QueryFunction,
  QueryKey,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query';

import type {
  ActivityItem,
  ChartDataPoint,
  Client,
  ClientInput,
  ClientList,
  ClientUpdate,
  DashboardSummary,
  Employee,
  EmployeeInput,
  EmployeeList,
  EmployeeUpdate,
  EmployeesReport,
  Expense,
  ExpenseInput,
  ExpenseList,
  ExpenseStat,
  ExpenseUpdate,
  FinancialReport,
  GetEmployeesReportParams,
  GetFinancialReportParams,
  GetProjectsReportParams,
  GetRevenueChartParams,
  GetTimeEntriesSummaryParams,
  HealthStatus,
  Invoice,
  InvoiceInput,
  InvoiceList,
  InvoiceStats,
  InvoiceUpdate,
  ListClientsParams,
  ListEmployeesParams,
  ListExpensesParams,
  ListInvoicesParams,
  ListProjectsParams,
  ListQuotesParams,
  ListTasksParams,
  ListTimeEntriesParams,
  Project,
  ProjectInput,
  ProjectList,
  ProjectStats,
  ProjectUpdate,
  ProjectsReport,
  Quote,
  QuoteInput,
  QuoteList,
  QuoteUpdate,
  Task,
  TaskInput,
  TaskList,
  TaskUpdate,
  TimeEntriesSummary,
  TimeEntry,
  TimeEntryInput,
  TimeEntryList,
  TimeEntryUpdate
} from './api.schemas';

import { customFetch } from '../custom-fetch';
import type { ErrorType , BodyType } from '../custom-fetch';

type AwaitedInput<T> = PromiseLike<T> | T;

      type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;


type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



const withQueryKey = <T extends object, K>(query: T, queryKey: K): T & { queryKey: K } => {
  const result = { queryKey } as T & { queryKey: K };
  for (const key of Object.keys(query)) {
    if (key === 'queryKey') continue;
    Object.defineProperty(result, key, {
      enumerable: true,
      configurable: true,
      get: () => (query as Record<string, unknown>)[key],
    });
  }
  return result;
};

export const getHealthCheckUrl = () => {




  return `/api/healthz`
}


export const healthCheck = async ( options?: RequestInit): Promise<HealthStatus> => {

  return customFetch<HealthStatus>(getHealthCheckUrl(),
  {
    ...options,
    method: 'GET'


  }
);}





export const getHealthCheckQueryKey = () => {
    return [
    `/api/healthz`
    ] as const;
    }


export const getHealthCheckQueryOptions = <TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>( options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getHealthCheckQueryKey();



    const queryFn: QueryFunction<Awaited<ReturnType<typeof healthCheck>>> = ({ signal }) => healthCheck({ signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData> & { queryKey: QueryKey }
}

export type HealthCheckQueryResult = NonNullable<Awaited<ReturnType<typeof healthCheck>>>
export type HealthCheckQueryError = ErrorType<unknown>




export function useHealthCheck<TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(
  options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getHealthCheckQueryOptions(options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







export const getGetDashboardSummaryUrl = () => {




  return `/api/dashboard/summary`
}


export const getDashboardSummary = async ( options?: RequestInit): Promise<DashboardSummary> => {

  return customFetch<DashboardSummary>(getGetDashboardSummaryUrl(),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetDashboardSummaryQueryKey = () => {
    return [
    `/api/dashboard/summary`
    ] as const;
    }


export const getGetDashboardSummaryQueryOptions = <TData = Awaited<ReturnType<typeof getDashboardSummary>>, TError = ErrorType<unknown>>( options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getDashboardSummary>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetDashboardSummaryQueryKey();



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getDashboardSummary>>> = ({ signal }) => getDashboardSummary({ signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getDashboardSummary>>, TError, TData> & { queryKey: QueryKey }
}

export type GetDashboardSummaryQueryResult = NonNullable<Awaited<ReturnType<typeof getDashboardSummary>>>
export type GetDashboardSummaryQueryError = ErrorType<unknown>




export function useGetDashboardSummary<TData = Awaited<ReturnType<typeof getDashboardSummary>>, TError = ErrorType<unknown>>(
  options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getDashboardSummary>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getGetDashboardSummaryQueryOptions(options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







export const getGetRevenueChartUrl = (params?: GetRevenueChartParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : String(value))
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/api/dashboard/revenue-chart?${stringifiedParams}` : `/api/dashboard/revenue-chart`
}


export const getRevenueChart = async (params?: GetRevenueChartParams, options?: RequestInit): Promise<ChartDataPoint[]> => {

  return customFetch<ChartDataPoint[]>(getGetRevenueChartUrl(params),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetRevenueChartQueryKey = (params?: GetRevenueChartParams,) => {
    return [
    `/api/dashboard/revenue-chart`, ...(params ? [params] : [])
    ] as const;
    }


export const getGetRevenueChartQueryOptions = <TData = Awaited<ReturnType<typeof getRevenueChart>>, TError = ErrorType<unknown>>(params?: GetRevenueChartParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getRevenueChart>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetRevenueChartQueryKey(params);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getRevenueChart>>> = ({ signal }) => getRevenueChart(params, { signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getRevenueChart>>, TError, TData> & { queryKey: QueryKey }
}

export type GetRevenueChartQueryResult = NonNullable<Awaited<ReturnType<typeof getRevenueChart>>>
export type GetRevenueChartQueryError = ErrorType<unknown>




export function useGetRevenueChart<TData = Awaited<ReturnType<typeof getRevenueChart>>, TError = ErrorType<unknown>>(
 params?: GetRevenueChartParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getRevenueChart>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getGetRevenueChartQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







export const getGetRecentActivityUrl = () => {




  return `/api/dashboard/recent-activity`
}


export const getRecentActivity = async ( options?: RequestInit): Promise<ActivityItem[]> => {

  return customFetch<ActivityItem[]>(getGetRecentActivityUrl(),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetRecentActivityQueryKey = () => {
    return [
    `/api/dashboard/recent-activity`
    ] as const;
    }


export const getGetRecentActivityQueryOptions = <TData = Awaited<ReturnType<typeof getRecentActivity>>, TError = ErrorType<unknown>>( options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getRecentActivity>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetRecentActivityQueryKey();



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getRecentActivity>>> = ({ signal }) => getRecentActivity({ signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getRecentActivity>>, TError, TData> & { queryKey: QueryKey }
}

export type GetRecentActivityQueryResult = NonNullable<Awaited<ReturnType<typeof getRecentActivity>>>
export type GetRecentActivityQueryError = ErrorType<unknown>




export function useGetRecentActivity<TData = Awaited<ReturnType<typeof getRecentActivity>>, TError = ErrorType<unknown>>(
  options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getRecentActivity>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getGetRecentActivityQueryOptions(options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







export const getGetUpcomingTasksUrl = () => {




  return `/api/dashboard/upcoming-tasks`
}


export const getUpcomingTasks = async ( options?: RequestInit): Promise<Task[]> => {

  return customFetch<Task[]>(getGetUpcomingTasksUrl(),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetUpcomingTasksQueryKey = () => {
    return [
    `/api/dashboard/upcoming-tasks`
    ] as const;
    }


export const getGetUpcomingTasksQueryOptions = <TData = Awaited<ReturnType<typeof getUpcomingTasks>>, TError = ErrorType<unknown>>( options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getUpcomingTasks>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetUpcomingTasksQueryKey();



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getUpcomingTasks>>> = ({ signal }) => getUpcomingTasks({ signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getUpcomingTasks>>, TError, TData> & { queryKey: QueryKey }
}

export type GetUpcomingTasksQueryResult = NonNullable<Awaited<ReturnType<typeof getUpcomingTasks>>>
export type GetUpcomingTasksQueryError = ErrorType<unknown>




export function useGetUpcomingTasks<TData = Awaited<ReturnType<typeof getUpcomingTasks>>, TError = ErrorType<unknown>>(
  options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getUpcomingTasks>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getGetUpcomingTasksQueryOptions(options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







export const getListClientsUrl = (params?: ListClientsParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : String(value))
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/api/clients?${stringifiedParams}` : `/api/clients`
}


export const listClients = async (params?: ListClientsParams, options?: RequestInit): Promise<ClientList> => {

  return customFetch<ClientList>(getListClientsUrl(params),
  {
    ...options,
    method: 'GET'


  }
);}





export const getListClientsQueryKey = (params?: ListClientsParams,) => {
    return [
    `/api/clients`, ...(params ? [params] : [])
    ] as const;
    }


export const getListClientsQueryOptions = <TData = Awaited<ReturnType<typeof listClients>>, TError = ErrorType<unknown>>(params?: ListClientsParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof listClients>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getListClientsQueryKey(params);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof listClients>>> = ({ signal }) => listClients(params, { signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof listClients>>, TError, TData> & { queryKey: QueryKey }
}

export type ListClientsQueryResult = NonNullable<Awaited<ReturnType<typeof listClients>>>
export type ListClientsQueryError = ErrorType<unknown>




export function useListClients<TData = Awaited<ReturnType<typeof listClients>>, TError = ErrorType<unknown>>(
 params?: ListClientsParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof listClients>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getListClientsQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







export const getCreateClientUrl = () => {




  return `/api/clients`
}


export const createClient = async (clientInput: ClientInput, options?: RequestInit): Promise<Client> => {

  return customFetch<Client>(getCreateClientUrl(),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(clientInput)
  }
);}




export const getCreateClientMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createClient>>, TError,{data: BodyType<ClientInput>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof createClient>>, TError,{data: BodyType<ClientInput>}, TContext> => {

const mutationKey = ['createClient'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof createClient>>, {data: BodyType<ClientInput>}> = (props) => {
          const {data} = props ?? {};

          return  createClient(data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type CreateClientMutationResult = NonNullable<Awaited<ReturnType<typeof createClient>>>
    export type CreateClientMutationBody = BodyType<ClientInput>
    export type CreateClientMutationError = ErrorType<unknown>


export const useCreateClient = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createClient>>, TError,{data: BodyType<ClientInput>}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof createClient>>,
        TError,
        {data: BodyType<ClientInput>},
        TContext
      > => {
      return useMutation(getCreateClientMutationOptions(options));
    }

export const getGetClientUrl = (id: number,) => {




  return `/api/clients/${id}`
}


export const getClient = async (id: number, options?: RequestInit): Promise<Client> => {

  return customFetch<Client>(getGetClientUrl(id),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetClientQueryKey = (id: number,) => {
    return [
    `/api/clients/${id}`
    ] as const;
    }


export const getGetClientQueryOptions = <TData = Awaited<ReturnType<typeof getClient>>, TError = ErrorType<void>>(id: number, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getClient>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetClientQueryKey(id);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getClient>>> = ({ signal }) => getClient(id, { signal, ...requestOptions });





   return  { queryKey, queryFn, enabled: id !== null && id !== undefined, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getClient>>, TError, TData> & { queryKey: QueryKey }
}

export type GetClientQueryResult = NonNullable<Awaited<ReturnType<typeof getClient>>>
export type GetClientQueryError = ErrorType<void>




export function useGetClient<TData = Awaited<ReturnType<typeof getClient>>, TError = ErrorType<void>>(
 id: number, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getClient>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getGetClientQueryOptions(id,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







export const getUpdateClientUrl = (id: number,) => {




  return `/api/clients/${id}`
}


export const updateClient = async (id: number,
    clientUpdate: ClientUpdate, options?: RequestInit): Promise<Client> => {

  return customFetch<Client>(getUpdateClientUrl(id),
  {
    ...options,
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(clientUpdate)
  }
);}




export const getUpdateClientMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateClient>>, TError,{id: number;data: BodyType<ClientUpdate>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof updateClient>>, TError,{id: number;data: BodyType<ClientUpdate>}, TContext> => {

const mutationKey = ['updateClient'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof updateClient>>, {id: number;data: BodyType<ClientUpdate>}> = (props) => {
          const {id,data} = props ?? {};

          return  updateClient(id,data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type UpdateClientMutationResult = NonNullable<Awaited<ReturnType<typeof updateClient>>>
    export type UpdateClientMutationBody = BodyType<ClientUpdate>
    export type UpdateClientMutationError = ErrorType<unknown>


export const useUpdateClient = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateClient>>, TError,{id: number;data: BodyType<ClientUpdate>}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof updateClient>>,
        TError,
        {id: number;data: BodyType<ClientUpdate>},
        TContext
      > => {
      return useMutation(getUpdateClientMutationOptions(options));
    }

export const getDeleteClientUrl = (id: number,) => {




  return `/api/clients/${id}`
}


export const deleteClient = async (id: number, options?: RequestInit): Promise<void> => {

  return customFetch<void>(getDeleteClientUrl(id),
  {
    ...options,
    method: 'DELETE'


  }
);}




export const getDeleteClientMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteClient>>, TError,{id: number}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof deleteClient>>, TError,{id: number}, TContext> => {

const mutationKey = ['deleteClient'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteClient>>, {id: number}> = (props) => {
          const {id} = props ?? {};

          return  deleteClient(id,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type DeleteClientMutationResult = NonNullable<Awaited<ReturnType<typeof deleteClient>>>

    export type DeleteClientMutationError = ErrorType<unknown>


export const useDeleteClient = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteClient>>, TError,{id: number}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof deleteClient>>,
        TError,
        {id: number},
        TContext
      > => {
      return useMutation(getDeleteClientMutationOptions(options));
    }

export const getGetClientProjectsUrl = (id: number,) => {




  return `/api/clients/${id}/projects`
}


export const getClientProjects = async (id: number, options?: RequestInit): Promise<Project[]> => {

  return customFetch<Project[]>(getGetClientProjectsUrl(id),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetClientProjectsQueryKey = (id: number,) => {
    return [
    `/api/clients/${id}/projects`
    ] as const;
    }


export const getGetClientProjectsQueryOptions = <TData = Awaited<ReturnType<typeof getClientProjects>>, TError = ErrorType<unknown>>(id: number, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getClientProjects>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetClientProjectsQueryKey(id);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getClientProjects>>> = ({ signal }) => getClientProjects(id, { signal, ...requestOptions });





   return  { queryKey, queryFn, enabled: id !== null && id !== undefined, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getClientProjects>>, TError, TData> & { queryKey: QueryKey }
}

export type GetClientProjectsQueryResult = NonNullable<Awaited<ReturnType<typeof getClientProjects>>>
export type GetClientProjectsQueryError = ErrorType<unknown>




export function useGetClientProjects<TData = Awaited<ReturnType<typeof getClientProjects>>, TError = ErrorType<unknown>>(
 id: number, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getClientProjects>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getGetClientProjectsQueryOptions(id,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







export const getGetClientInvoicesUrl = (id: number,) => {




  return `/api/clients/${id}/invoices`
}


export const getClientInvoices = async (id: number, options?: RequestInit): Promise<Invoice[]> => {

  return customFetch<Invoice[]>(getGetClientInvoicesUrl(id),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetClientInvoicesQueryKey = (id: number,) => {
    return [
    `/api/clients/${id}/invoices`
    ] as const;
    }


export const getGetClientInvoicesQueryOptions = <TData = Awaited<ReturnType<typeof getClientInvoices>>, TError = ErrorType<unknown>>(id: number, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getClientInvoices>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetClientInvoicesQueryKey(id);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getClientInvoices>>> = ({ signal }) => getClientInvoices(id, { signal, ...requestOptions });





   return  { queryKey, queryFn, enabled: id !== null && id !== undefined, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getClientInvoices>>, TError, TData> & { queryKey: QueryKey }
}

export type GetClientInvoicesQueryResult = NonNullable<Awaited<ReturnType<typeof getClientInvoices>>>
export type GetClientInvoicesQueryError = ErrorType<unknown>




export function useGetClientInvoices<TData = Awaited<ReturnType<typeof getClientInvoices>>, TError = ErrorType<unknown>>(
 id: number, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getClientInvoices>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getGetClientInvoicesQueryOptions(id,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







export const getListProjectsUrl = (params?: ListProjectsParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : String(value))
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/api/projects?${stringifiedParams}` : `/api/projects`
}


export const listProjects = async (params?: ListProjectsParams, options?: RequestInit): Promise<ProjectList> => {

  return customFetch<ProjectList>(getListProjectsUrl(params),
  {
    ...options,
    method: 'GET'


  }
);}





export const getListProjectsQueryKey = (params?: ListProjectsParams,) => {
    return [
    `/api/projects`, ...(params ? [params] : [])
    ] as const;
    }


export const getListProjectsQueryOptions = <TData = Awaited<ReturnType<typeof listProjects>>, TError = ErrorType<unknown>>(params?: ListProjectsParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof listProjects>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getListProjectsQueryKey(params);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof listProjects>>> = ({ signal }) => listProjects(params, { signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof listProjects>>, TError, TData> & { queryKey: QueryKey }
}

export type ListProjectsQueryResult = NonNullable<Awaited<ReturnType<typeof listProjects>>>
export type ListProjectsQueryError = ErrorType<unknown>




export function useListProjects<TData = Awaited<ReturnType<typeof listProjects>>, TError = ErrorType<unknown>>(
 params?: ListProjectsParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof listProjects>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getListProjectsQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







export const getCreateProjectUrl = () => {




  return `/api/projects`
}


export const createProject = async (projectInput: ProjectInput, options?: RequestInit): Promise<Project> => {

  return customFetch<Project>(getCreateProjectUrl(),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(projectInput)
  }
);}




export const getCreateProjectMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createProject>>, TError,{data: BodyType<ProjectInput>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof createProject>>, TError,{data: BodyType<ProjectInput>}, TContext> => {

const mutationKey = ['createProject'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof createProject>>, {data: BodyType<ProjectInput>}> = (props) => {
          const {data} = props ?? {};

          return  createProject(data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type CreateProjectMutationResult = NonNullable<Awaited<ReturnType<typeof createProject>>>
    export type CreateProjectMutationBody = BodyType<ProjectInput>
    export type CreateProjectMutationError = ErrorType<unknown>


export const useCreateProject = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createProject>>, TError,{data: BodyType<ProjectInput>}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof createProject>>,
        TError,
        {data: BodyType<ProjectInput>},
        TContext
      > => {
      return useMutation(getCreateProjectMutationOptions(options));
    }

export const getGetProjectUrl = (id: number,) => {




  return `/api/projects/${id}`
}


export const getProject = async (id: number, options?: RequestInit): Promise<Project> => {

  return customFetch<Project>(getGetProjectUrl(id),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetProjectQueryKey = (id: number,) => {
    return [
    `/api/projects/${id}`
    ] as const;
    }


export const getGetProjectQueryOptions = <TData = Awaited<ReturnType<typeof getProject>>, TError = ErrorType<void>>(id: number, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getProject>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetProjectQueryKey(id);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getProject>>> = ({ signal }) => getProject(id, { signal, ...requestOptions });





   return  { queryKey, queryFn, enabled: id !== null && id !== undefined, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getProject>>, TError, TData> & { queryKey: QueryKey }
}

export type GetProjectQueryResult = NonNullable<Awaited<ReturnType<typeof getProject>>>
export type GetProjectQueryError = ErrorType<void>




export function useGetProject<TData = Awaited<ReturnType<typeof getProject>>, TError = ErrorType<void>>(
 id: number, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getProject>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getGetProjectQueryOptions(id,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







export const getUpdateProjectUrl = (id: number,) => {




  return `/api/projects/${id}`
}


export const updateProject = async (id: number,
    projectUpdate: ProjectUpdate, options?: RequestInit): Promise<Project> => {

  return customFetch<Project>(getUpdateProjectUrl(id),
  {
    ...options,
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(projectUpdate)
  }
);}




export const getUpdateProjectMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateProject>>, TError,{id: number;data: BodyType<ProjectUpdate>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof updateProject>>, TError,{id: number;data: BodyType<ProjectUpdate>}, TContext> => {

const mutationKey = ['updateProject'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof updateProject>>, {id: number;data: BodyType<ProjectUpdate>}> = (props) => {
          const {id,data} = props ?? {};

          return  updateProject(id,data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type UpdateProjectMutationResult = NonNullable<Awaited<ReturnType<typeof updateProject>>>
    export type UpdateProjectMutationBody = BodyType<ProjectUpdate>
    export type UpdateProjectMutationError = ErrorType<unknown>


export const useUpdateProject = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateProject>>, TError,{id: number;data: BodyType<ProjectUpdate>}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof updateProject>>,
        TError,
        {id: number;data: BodyType<ProjectUpdate>},
        TContext
      > => {
      return useMutation(getUpdateProjectMutationOptions(options));
    }

export const getDeleteProjectUrl = (id: number,) => {




  return `/api/projects/${id}`
}


export const deleteProject = async (id: number, options?: RequestInit): Promise<void> => {

  return customFetch<void>(getDeleteProjectUrl(id),
  {
    ...options,
    method: 'DELETE'


  }
);}




export const getDeleteProjectMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteProject>>, TError,{id: number}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof deleteProject>>, TError,{id: number}, TContext> => {

const mutationKey = ['deleteProject'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteProject>>, {id: number}> = (props) => {
          const {id} = props ?? {};

          return  deleteProject(id,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type DeleteProjectMutationResult = NonNullable<Awaited<ReturnType<typeof deleteProject>>>

    export type DeleteProjectMutationError = ErrorType<unknown>


export const useDeleteProject = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteProject>>, TError,{id: number}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof deleteProject>>,
        TError,
        {id: number},
        TContext
      > => {
      return useMutation(getDeleteProjectMutationOptions(options));
    }

export const getGetProjectStatsUrl = () => {




  return `/api/projects/stats`
}


export const getProjectStats = async ( options?: RequestInit): Promise<ProjectStats> => {

  return customFetch<ProjectStats>(getGetProjectStatsUrl(),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetProjectStatsQueryKey = () => {
    return [
    `/api/projects/stats`
    ] as const;
    }


export const getGetProjectStatsQueryOptions = <TData = Awaited<ReturnType<typeof getProjectStats>>, TError = ErrorType<unknown>>( options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getProjectStats>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetProjectStatsQueryKey();



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getProjectStats>>> = ({ signal }) => getProjectStats({ signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getProjectStats>>, TError, TData> & { queryKey: QueryKey }
}

export type GetProjectStatsQueryResult = NonNullable<Awaited<ReturnType<typeof getProjectStats>>>
export type GetProjectStatsQueryError = ErrorType<unknown>




export function useGetProjectStats<TData = Awaited<ReturnType<typeof getProjectStats>>, TError = ErrorType<unknown>>(
  options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getProjectStats>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getGetProjectStatsQueryOptions(options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







export const getListTasksUrl = (params?: ListTasksParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : String(value))
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/api/tasks?${stringifiedParams}` : `/api/tasks`
}


export const listTasks = async (params?: ListTasksParams, options?: RequestInit): Promise<TaskList> => {

  return customFetch<TaskList>(getListTasksUrl(params),
  {
    ...options,
    method: 'GET'


  }
);}





export const getListTasksQueryKey = (params?: ListTasksParams,) => {
    return [
    `/api/tasks`, ...(params ? [params] : [])
    ] as const;
    }


export const getListTasksQueryOptions = <TData = Awaited<ReturnType<typeof listTasks>>, TError = ErrorType<unknown>>(params?: ListTasksParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof listTasks>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getListTasksQueryKey(params);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof listTasks>>> = ({ signal }) => listTasks(params, { signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof listTasks>>, TError, TData> & { queryKey: QueryKey }
}

export type ListTasksQueryResult = NonNullable<Awaited<ReturnType<typeof listTasks>>>
export type ListTasksQueryError = ErrorType<unknown>




export function useListTasks<TData = Awaited<ReturnType<typeof listTasks>>, TError = ErrorType<unknown>>(
 params?: ListTasksParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof listTasks>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getListTasksQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







export const getCreateTaskUrl = () => {




  return `/api/tasks`
}


export const createTask = async (taskInput: TaskInput, options?: RequestInit): Promise<Task> => {

  return customFetch<Task>(getCreateTaskUrl(),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(taskInput)
  }
);}




export const getCreateTaskMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createTask>>, TError,{data: BodyType<TaskInput>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof createTask>>, TError,{data: BodyType<TaskInput>}, TContext> => {

const mutationKey = ['createTask'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof createTask>>, {data: BodyType<TaskInput>}> = (props) => {
          const {data} = props ?? {};

          return  createTask(data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type CreateTaskMutationResult = NonNullable<Awaited<ReturnType<typeof createTask>>>
    export type CreateTaskMutationBody = BodyType<TaskInput>
    export type CreateTaskMutationError = ErrorType<unknown>


export const useCreateTask = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createTask>>, TError,{data: BodyType<TaskInput>}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof createTask>>,
        TError,
        {data: BodyType<TaskInput>},
        TContext
      > => {
      return useMutation(getCreateTaskMutationOptions(options));
    }

export const getGetTaskUrl = (id: number,) => {




  return `/api/tasks/${id}`
}


export const getTask = async (id: number, options?: RequestInit): Promise<Task> => {

  return customFetch<Task>(getGetTaskUrl(id),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetTaskQueryKey = (id: number,) => {
    return [
    `/api/tasks/${id}`
    ] as const;
    }


export const getGetTaskQueryOptions = <TData = Awaited<ReturnType<typeof getTask>>, TError = ErrorType<unknown>>(id: number, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getTask>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetTaskQueryKey(id);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getTask>>> = ({ signal }) => getTask(id, { signal, ...requestOptions });





   return  { queryKey, queryFn, enabled: id !== null && id !== undefined, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getTask>>, TError, TData> & { queryKey: QueryKey }
}

export type GetTaskQueryResult = NonNullable<Awaited<ReturnType<typeof getTask>>>
export type GetTaskQueryError = ErrorType<unknown>




export function useGetTask<TData = Awaited<ReturnType<typeof getTask>>, TError = ErrorType<unknown>>(
 id: number, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getTask>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getGetTaskQueryOptions(id,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







export const getUpdateTaskUrl = (id: number,) => {




  return `/api/tasks/${id}`
}


export const updateTask = async (id: number,
    taskUpdate: TaskUpdate, options?: RequestInit): Promise<Task> => {

  return customFetch<Task>(getUpdateTaskUrl(id),
  {
    ...options,
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(taskUpdate)
  }
);}




export const getUpdateTaskMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateTask>>, TError,{id: number;data: BodyType<TaskUpdate>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof updateTask>>, TError,{id: number;data: BodyType<TaskUpdate>}, TContext> => {

const mutationKey = ['updateTask'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof updateTask>>, {id: number;data: BodyType<TaskUpdate>}> = (props) => {
          const {id,data} = props ?? {};

          return  updateTask(id,data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type UpdateTaskMutationResult = NonNullable<Awaited<ReturnType<typeof updateTask>>>
    export type UpdateTaskMutationBody = BodyType<TaskUpdate>
    export type UpdateTaskMutationError = ErrorType<unknown>


export const useUpdateTask = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateTask>>, TError,{id: number;data: BodyType<TaskUpdate>}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof updateTask>>,
        TError,
        {id: number;data: BodyType<TaskUpdate>},
        TContext
      > => {
      return useMutation(getUpdateTaskMutationOptions(options));
    }

export const getDeleteTaskUrl = (id: number,) => {




  return `/api/tasks/${id}`
}


export const deleteTask = async (id: number, options?: RequestInit): Promise<void> => {

  return customFetch<void>(getDeleteTaskUrl(id),
  {
    ...options,
    method: 'DELETE'


  }
);}




export const getDeleteTaskMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteTask>>, TError,{id: number}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof deleteTask>>, TError,{id: number}, TContext> => {

const mutationKey = ['deleteTask'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteTask>>, {id: number}> = (props) => {
          const {id} = props ?? {};

          return  deleteTask(id,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type DeleteTaskMutationResult = NonNullable<Awaited<ReturnType<typeof deleteTask>>>

    export type DeleteTaskMutationError = ErrorType<unknown>


export const useDeleteTask = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteTask>>, TError,{id: number}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof deleteTask>>,
        TError,
        {id: number},
        TContext
      > => {
      return useMutation(getDeleteTaskMutationOptions(options));
    }

export const getListEmployeesUrl = (params?: ListEmployeesParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : String(value))
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/api/employees?${stringifiedParams}` : `/api/employees`
}


export const listEmployees = async (params?: ListEmployeesParams, options?: RequestInit): Promise<EmployeeList> => {

  return customFetch<EmployeeList>(getListEmployeesUrl(params),
  {
    ...options,
    method: 'GET'


  }
);}





export const getListEmployeesQueryKey = (params?: ListEmployeesParams,) => {
    return [
    `/api/employees`, ...(params ? [params] : [])
    ] as const;
    }


export const getListEmployeesQueryOptions = <TData = Awaited<ReturnType<typeof listEmployees>>, TError = ErrorType<unknown>>(params?: ListEmployeesParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof listEmployees>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getListEmployeesQueryKey(params);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof listEmployees>>> = ({ signal }) => listEmployees(params, { signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof listEmployees>>, TError, TData> & { queryKey: QueryKey }
}

export type ListEmployeesQueryResult = NonNullable<Awaited<ReturnType<typeof listEmployees>>>
export type ListEmployeesQueryError = ErrorType<unknown>




export function useListEmployees<TData = Awaited<ReturnType<typeof listEmployees>>, TError = ErrorType<unknown>>(
 params?: ListEmployeesParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof listEmployees>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getListEmployeesQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







export const getCreateEmployeeUrl = () => {




  return `/api/employees`
}


export const createEmployee = async (employeeInput: EmployeeInput, options?: RequestInit): Promise<Employee> => {

  return customFetch<Employee>(getCreateEmployeeUrl(),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(employeeInput)
  }
);}




export const getCreateEmployeeMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createEmployee>>, TError,{data: BodyType<EmployeeInput>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof createEmployee>>, TError,{data: BodyType<EmployeeInput>}, TContext> => {

const mutationKey = ['createEmployee'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof createEmployee>>, {data: BodyType<EmployeeInput>}> = (props) => {
          const {data} = props ?? {};

          return  createEmployee(data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type CreateEmployeeMutationResult = NonNullable<Awaited<ReturnType<typeof createEmployee>>>
    export type CreateEmployeeMutationBody = BodyType<EmployeeInput>
    export type CreateEmployeeMutationError = ErrorType<unknown>


export const useCreateEmployee = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createEmployee>>, TError,{data: BodyType<EmployeeInput>}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof createEmployee>>,
        TError,
        {data: BodyType<EmployeeInput>},
        TContext
      > => {
      return useMutation(getCreateEmployeeMutationOptions(options));
    }

export const getGetEmployeeUrl = (id: number,) => {




  return `/api/employees/${id}`
}


export const getEmployee = async (id: number, options?: RequestInit): Promise<Employee> => {

  return customFetch<Employee>(getGetEmployeeUrl(id),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetEmployeeQueryKey = (id: number,) => {
    return [
    `/api/employees/${id}`
    ] as const;
    }


export const getGetEmployeeQueryOptions = <TData = Awaited<ReturnType<typeof getEmployee>>, TError = ErrorType<unknown>>(id: number, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getEmployee>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetEmployeeQueryKey(id);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getEmployee>>> = ({ signal }) => getEmployee(id, { signal, ...requestOptions });





   return  { queryKey, queryFn, enabled: id !== null && id !== undefined, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getEmployee>>, TError, TData> & { queryKey: QueryKey }
}

export type GetEmployeeQueryResult = NonNullable<Awaited<ReturnType<typeof getEmployee>>>
export type GetEmployeeQueryError = ErrorType<unknown>




export function useGetEmployee<TData = Awaited<ReturnType<typeof getEmployee>>, TError = ErrorType<unknown>>(
 id: number, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getEmployee>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getGetEmployeeQueryOptions(id,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







export const getUpdateEmployeeUrl = (id: number,) => {




  return `/api/employees/${id}`
}


export const updateEmployee = async (id: number,
    employeeUpdate: EmployeeUpdate, options?: RequestInit): Promise<Employee> => {

  return customFetch<Employee>(getUpdateEmployeeUrl(id),
  {
    ...options,
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(employeeUpdate)
  }
);}




export const getUpdateEmployeeMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateEmployee>>, TError,{id: number;data: BodyType<EmployeeUpdate>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof updateEmployee>>, TError,{id: number;data: BodyType<EmployeeUpdate>}, TContext> => {

const mutationKey = ['updateEmployee'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof updateEmployee>>, {id: number;data: BodyType<EmployeeUpdate>}> = (props) => {
          const {id,data} = props ?? {};

          return  updateEmployee(id,data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type UpdateEmployeeMutationResult = NonNullable<Awaited<ReturnType<typeof updateEmployee>>>
    export type UpdateEmployeeMutationBody = BodyType<EmployeeUpdate>
    export type UpdateEmployeeMutationError = ErrorType<unknown>


export const useUpdateEmployee = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateEmployee>>, TError,{id: number;data: BodyType<EmployeeUpdate>}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof updateEmployee>>,
        TError,
        {id: number;data: BodyType<EmployeeUpdate>},
        TContext
      > => {
      return useMutation(getUpdateEmployeeMutationOptions(options));
    }

export const getDeleteEmployeeUrl = (id: number,) => {




  return `/api/employees/${id}`
}


export const deleteEmployee = async (id: number, options?: RequestInit): Promise<void> => {

  return customFetch<void>(getDeleteEmployeeUrl(id),
  {
    ...options,
    method: 'DELETE'


  }
);}




export const getDeleteEmployeeMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteEmployee>>, TError,{id: number}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof deleteEmployee>>, TError,{id: number}, TContext> => {

const mutationKey = ['deleteEmployee'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteEmployee>>, {id: number}> = (props) => {
          const {id} = props ?? {};

          return  deleteEmployee(id,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type DeleteEmployeeMutationResult = NonNullable<Awaited<ReturnType<typeof deleteEmployee>>>

    export type DeleteEmployeeMutationError = ErrorType<unknown>


export const useDeleteEmployee = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteEmployee>>, TError,{id: number}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof deleteEmployee>>,
        TError,
        {id: number},
        TContext
      > => {
      return useMutation(getDeleteEmployeeMutationOptions(options));
    }

export const getListTimeEntriesUrl = (params?: ListTimeEntriesParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : String(value))
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/api/time-entries?${stringifiedParams}` : `/api/time-entries`
}


export const listTimeEntries = async (params?: ListTimeEntriesParams, options?: RequestInit): Promise<TimeEntryList> => {

  return customFetch<TimeEntryList>(getListTimeEntriesUrl(params),
  {
    ...options,
    method: 'GET'


  }
);}





export const getListTimeEntriesQueryKey = (params?: ListTimeEntriesParams,) => {
    return [
    `/api/time-entries`, ...(params ? [params] : [])
    ] as const;
    }


export const getListTimeEntriesQueryOptions = <TData = Awaited<ReturnType<typeof listTimeEntries>>, TError = ErrorType<unknown>>(params?: ListTimeEntriesParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof listTimeEntries>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getListTimeEntriesQueryKey(params);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof listTimeEntries>>> = ({ signal }) => listTimeEntries(params, { signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof listTimeEntries>>, TError, TData> & { queryKey: QueryKey }
}

export type ListTimeEntriesQueryResult = NonNullable<Awaited<ReturnType<typeof listTimeEntries>>>
export type ListTimeEntriesQueryError = ErrorType<unknown>




export function useListTimeEntries<TData = Awaited<ReturnType<typeof listTimeEntries>>, TError = ErrorType<unknown>>(
 params?: ListTimeEntriesParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof listTimeEntries>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getListTimeEntriesQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







export const getCreateTimeEntryUrl = () => {




  return `/api/time-entries`
}


export const createTimeEntry = async (timeEntryInput: TimeEntryInput, options?: RequestInit): Promise<TimeEntry> => {

  return customFetch<TimeEntry>(getCreateTimeEntryUrl(),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(timeEntryInput)
  }
);}




export const getCreateTimeEntryMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createTimeEntry>>, TError,{data: BodyType<TimeEntryInput>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof createTimeEntry>>, TError,{data: BodyType<TimeEntryInput>}, TContext> => {

const mutationKey = ['createTimeEntry'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof createTimeEntry>>, {data: BodyType<TimeEntryInput>}> = (props) => {
          const {data} = props ?? {};

          return  createTimeEntry(data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type CreateTimeEntryMutationResult = NonNullable<Awaited<ReturnType<typeof createTimeEntry>>>
    export type CreateTimeEntryMutationBody = BodyType<TimeEntryInput>
    export type CreateTimeEntryMutationError = ErrorType<unknown>


export const useCreateTimeEntry = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createTimeEntry>>, TError,{data: BodyType<TimeEntryInput>}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof createTimeEntry>>,
        TError,
        {data: BodyType<TimeEntryInput>},
        TContext
      > => {
      return useMutation(getCreateTimeEntryMutationOptions(options));
    }

export const getUpdateTimeEntryUrl = (id: number,) => {




  return `/api/time-entries/${id}`
}


export const updateTimeEntry = async (id: number,
    timeEntryUpdate: TimeEntryUpdate, options?: RequestInit): Promise<TimeEntry> => {

  return customFetch<TimeEntry>(getUpdateTimeEntryUrl(id),
  {
    ...options,
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(timeEntryUpdate)
  }
);}




export const getUpdateTimeEntryMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateTimeEntry>>, TError,{id: number;data: BodyType<TimeEntryUpdate>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof updateTimeEntry>>, TError,{id: number;data: BodyType<TimeEntryUpdate>}, TContext> => {

const mutationKey = ['updateTimeEntry'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof updateTimeEntry>>, {id: number;data: BodyType<TimeEntryUpdate>}> = (props) => {
          const {id,data} = props ?? {};

          return  updateTimeEntry(id,data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type UpdateTimeEntryMutationResult = NonNullable<Awaited<ReturnType<typeof updateTimeEntry>>>
    export type UpdateTimeEntryMutationBody = BodyType<TimeEntryUpdate>
    export type UpdateTimeEntryMutationError = ErrorType<unknown>


export const useUpdateTimeEntry = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateTimeEntry>>, TError,{id: number;data: BodyType<TimeEntryUpdate>}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof updateTimeEntry>>,
        TError,
        {id: number;data: BodyType<TimeEntryUpdate>},
        TContext
      > => {
      return useMutation(getUpdateTimeEntryMutationOptions(options));
    }

export const getDeleteTimeEntryUrl = (id: number,) => {




  return `/api/time-entries/${id}`
}


export const deleteTimeEntry = async (id: number, options?: RequestInit): Promise<void> => {

  return customFetch<void>(getDeleteTimeEntryUrl(id),
  {
    ...options,
    method: 'DELETE'


  }
);}




export const getDeleteTimeEntryMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteTimeEntry>>, TError,{id: number}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof deleteTimeEntry>>, TError,{id: number}, TContext> => {

const mutationKey = ['deleteTimeEntry'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteTimeEntry>>, {id: number}> = (props) => {
          const {id} = props ?? {};

          return  deleteTimeEntry(id,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type DeleteTimeEntryMutationResult = NonNullable<Awaited<ReturnType<typeof deleteTimeEntry>>>

    export type DeleteTimeEntryMutationError = ErrorType<unknown>


export const useDeleteTimeEntry = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteTimeEntry>>, TError,{id: number}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof deleteTimeEntry>>,
        TError,
        {id: number},
        TContext
      > => {
      return useMutation(getDeleteTimeEntryMutationOptions(options));
    }

export const getGetTimeEntriesSummaryUrl = (params?: GetTimeEntriesSummaryParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : String(value))
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/api/time-entries/summary?${stringifiedParams}` : `/api/time-entries/summary`
}


export const getTimeEntriesSummary = async (params?: GetTimeEntriesSummaryParams, options?: RequestInit): Promise<TimeEntriesSummary> => {

  return customFetch<TimeEntriesSummary>(getGetTimeEntriesSummaryUrl(params),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetTimeEntriesSummaryQueryKey = (params?: GetTimeEntriesSummaryParams,) => {
    return [
    `/api/time-entries/summary`, ...(params ? [params] : [])
    ] as const;
    }


export const getGetTimeEntriesSummaryQueryOptions = <TData = Awaited<ReturnType<typeof getTimeEntriesSummary>>, TError = ErrorType<unknown>>(params?: GetTimeEntriesSummaryParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getTimeEntriesSummary>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetTimeEntriesSummaryQueryKey(params);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getTimeEntriesSummary>>> = ({ signal }) => getTimeEntriesSummary(params, { signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getTimeEntriesSummary>>, TError, TData> & { queryKey: QueryKey }
}

export type GetTimeEntriesSummaryQueryResult = NonNullable<Awaited<ReturnType<typeof getTimeEntriesSummary>>>
export type GetTimeEntriesSummaryQueryError = ErrorType<unknown>




export function useGetTimeEntriesSummary<TData = Awaited<ReturnType<typeof getTimeEntriesSummary>>, TError = ErrorType<unknown>>(
 params?: GetTimeEntriesSummaryParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getTimeEntriesSummary>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getGetTimeEntriesSummaryQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







export const getListQuotesUrl = (params?: ListQuotesParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : String(value))
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/api/quotes?${stringifiedParams}` : `/api/quotes`
}


export const listQuotes = async (params?: ListQuotesParams, options?: RequestInit): Promise<QuoteList> => {

  return customFetch<QuoteList>(getListQuotesUrl(params),
  {
    ...options,
    method: 'GET'


  }
);}





export const getListQuotesQueryKey = (params?: ListQuotesParams,) => {
    return [
    `/api/quotes`, ...(params ? [params] : [])
    ] as const;
    }


export const getListQuotesQueryOptions = <TData = Awaited<ReturnType<typeof listQuotes>>, TError = ErrorType<unknown>>(params?: ListQuotesParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof listQuotes>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getListQuotesQueryKey(params);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof listQuotes>>> = ({ signal }) => listQuotes(params, { signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof listQuotes>>, TError, TData> & { queryKey: QueryKey }
}

export type ListQuotesQueryResult = NonNullable<Awaited<ReturnType<typeof listQuotes>>>
export type ListQuotesQueryError = ErrorType<unknown>




export function useListQuotes<TData = Awaited<ReturnType<typeof listQuotes>>, TError = ErrorType<unknown>>(
 params?: ListQuotesParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof listQuotes>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getListQuotesQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







export const getCreateQuoteUrl = () => {




  return `/api/quotes`
}


export const createQuote = async (quoteInput: QuoteInput, options?: RequestInit): Promise<Quote> => {

  return customFetch<Quote>(getCreateQuoteUrl(),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(quoteInput)
  }
);}




export const getCreateQuoteMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createQuote>>, TError,{data: BodyType<QuoteInput>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof createQuote>>, TError,{data: BodyType<QuoteInput>}, TContext> => {

const mutationKey = ['createQuote'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof createQuote>>, {data: BodyType<QuoteInput>}> = (props) => {
          const {data} = props ?? {};

          return  createQuote(data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type CreateQuoteMutationResult = NonNullable<Awaited<ReturnType<typeof createQuote>>>
    export type CreateQuoteMutationBody = BodyType<QuoteInput>
    export type CreateQuoteMutationError = ErrorType<unknown>


export const useCreateQuote = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createQuote>>, TError,{data: BodyType<QuoteInput>}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof createQuote>>,
        TError,
        {data: BodyType<QuoteInput>},
        TContext
      > => {
      return useMutation(getCreateQuoteMutationOptions(options));
    }

export const getGetQuoteUrl = (id: number,) => {




  return `/api/quotes/${id}`
}


export const getQuote = async (id: number, options?: RequestInit): Promise<Quote> => {

  return customFetch<Quote>(getGetQuoteUrl(id),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetQuoteQueryKey = (id: number,) => {
    return [
    `/api/quotes/${id}`
    ] as const;
    }


export const getGetQuoteQueryOptions = <TData = Awaited<ReturnType<typeof getQuote>>, TError = ErrorType<unknown>>(id: number, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getQuote>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetQuoteQueryKey(id);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getQuote>>> = ({ signal }) => getQuote(id, { signal, ...requestOptions });





   return  { queryKey, queryFn, enabled: id !== null && id !== undefined, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getQuote>>, TError, TData> & { queryKey: QueryKey }
}

export type GetQuoteQueryResult = NonNullable<Awaited<ReturnType<typeof getQuote>>>
export type GetQuoteQueryError = ErrorType<unknown>




export function useGetQuote<TData = Awaited<ReturnType<typeof getQuote>>, TError = ErrorType<unknown>>(
 id: number, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getQuote>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getGetQuoteQueryOptions(id,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







export const getUpdateQuoteUrl = (id: number,) => {




  return `/api/quotes/${id}`
}


export const updateQuote = async (id: number,
    quoteUpdate: QuoteUpdate, options?: RequestInit): Promise<Quote> => {

  return customFetch<Quote>(getUpdateQuoteUrl(id),
  {
    ...options,
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(quoteUpdate)
  }
);}




export const getUpdateQuoteMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateQuote>>, TError,{id: number;data: BodyType<QuoteUpdate>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof updateQuote>>, TError,{id: number;data: BodyType<QuoteUpdate>}, TContext> => {

const mutationKey = ['updateQuote'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof updateQuote>>, {id: number;data: BodyType<QuoteUpdate>}> = (props) => {
          const {id,data} = props ?? {};

          return  updateQuote(id,data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type UpdateQuoteMutationResult = NonNullable<Awaited<ReturnType<typeof updateQuote>>>
    export type UpdateQuoteMutationBody = BodyType<QuoteUpdate>
    export type UpdateQuoteMutationError = ErrorType<unknown>


export const useUpdateQuote = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateQuote>>, TError,{id: number;data: BodyType<QuoteUpdate>}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof updateQuote>>,
        TError,
        {id: number;data: BodyType<QuoteUpdate>},
        TContext
      > => {
      return useMutation(getUpdateQuoteMutationOptions(options));
    }

export const getDeleteQuoteUrl = (id: number,) => {




  return `/api/quotes/${id}`
}


export const deleteQuote = async (id: number, options?: RequestInit): Promise<void> => {

  return customFetch<void>(getDeleteQuoteUrl(id),
  {
    ...options,
    method: 'DELETE'


  }
);}




export const getDeleteQuoteMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteQuote>>, TError,{id: number}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof deleteQuote>>, TError,{id: number}, TContext> => {

const mutationKey = ['deleteQuote'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteQuote>>, {id: number}> = (props) => {
          const {id} = props ?? {};

          return  deleteQuote(id,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type DeleteQuoteMutationResult = NonNullable<Awaited<ReturnType<typeof deleteQuote>>>

    export type DeleteQuoteMutationError = ErrorType<unknown>


export const useDeleteQuote = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteQuote>>, TError,{id: number}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof deleteQuote>>,
        TError,
        {id: number},
        TContext
      > => {
      return useMutation(getDeleteQuoteMutationOptions(options));
    }

export const getConvertQuoteToInvoiceUrl = (id: number,) => {




  return `/api/quotes/${id}/convert`
}


export const convertQuoteToInvoice = async (id: number, options?: RequestInit): Promise<Invoice> => {

  return customFetch<Invoice>(getConvertQuoteToInvoiceUrl(id),
  {
    ...options,
    method: 'POST'


  }
);}




export const getConvertQuoteToInvoiceMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof convertQuoteToInvoice>>, TError,{id: number}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof convertQuoteToInvoice>>, TError,{id: number}, TContext> => {

const mutationKey = ['convertQuoteToInvoice'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof convertQuoteToInvoice>>, {id: number}> = (props) => {
          const {id} = props ?? {};

          return  convertQuoteToInvoice(id,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type ConvertQuoteToInvoiceMutationResult = NonNullable<Awaited<ReturnType<typeof convertQuoteToInvoice>>>

    export type ConvertQuoteToInvoiceMutationError = ErrorType<unknown>


export const useConvertQuoteToInvoice = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof convertQuoteToInvoice>>, TError,{id: number}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof convertQuoteToInvoice>>,
        TError,
        {id: number},
        TContext
      > => {
      return useMutation(getConvertQuoteToInvoiceMutationOptions(options));
    }

export const getListInvoicesUrl = (params?: ListInvoicesParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : String(value))
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/api/invoices?${stringifiedParams}` : `/api/invoices`
}


export const listInvoices = async (params?: ListInvoicesParams, options?: RequestInit): Promise<InvoiceList> => {

  return customFetch<InvoiceList>(getListInvoicesUrl(params),
  {
    ...options,
    method: 'GET'


  }
);}





export const getListInvoicesQueryKey = (params?: ListInvoicesParams,) => {
    return [
    `/api/invoices`, ...(params ? [params] : [])
    ] as const;
    }


export const getListInvoicesQueryOptions = <TData = Awaited<ReturnType<typeof listInvoices>>, TError = ErrorType<unknown>>(params?: ListInvoicesParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof listInvoices>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getListInvoicesQueryKey(params);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof listInvoices>>> = ({ signal }) => listInvoices(params, { signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof listInvoices>>, TError, TData> & { queryKey: QueryKey }
}

export type ListInvoicesQueryResult = NonNullable<Awaited<ReturnType<typeof listInvoices>>>
export type ListInvoicesQueryError = ErrorType<unknown>




export function useListInvoices<TData = Awaited<ReturnType<typeof listInvoices>>, TError = ErrorType<unknown>>(
 params?: ListInvoicesParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof listInvoices>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getListInvoicesQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







export const getCreateInvoiceUrl = () => {




  return `/api/invoices`
}


export const createInvoice = async (invoiceInput: InvoiceInput, options?: RequestInit): Promise<Invoice> => {

  return customFetch<Invoice>(getCreateInvoiceUrl(),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(invoiceInput)
  }
);}




export const getCreateInvoiceMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createInvoice>>, TError,{data: BodyType<InvoiceInput>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof createInvoice>>, TError,{data: BodyType<InvoiceInput>}, TContext> => {

const mutationKey = ['createInvoice'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof createInvoice>>, {data: BodyType<InvoiceInput>}> = (props) => {
          const {data} = props ?? {};

          return  createInvoice(data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type CreateInvoiceMutationResult = NonNullable<Awaited<ReturnType<typeof createInvoice>>>
    export type CreateInvoiceMutationBody = BodyType<InvoiceInput>
    export type CreateInvoiceMutationError = ErrorType<unknown>


export const useCreateInvoice = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createInvoice>>, TError,{data: BodyType<InvoiceInput>}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof createInvoice>>,
        TError,
        {data: BodyType<InvoiceInput>},
        TContext
      > => {
      return useMutation(getCreateInvoiceMutationOptions(options));
    }

export const getGetInvoiceUrl = (id: number,) => {




  return `/api/invoices/${id}`
}


export const getInvoice = async (id: number, options?: RequestInit): Promise<Invoice> => {

  return customFetch<Invoice>(getGetInvoiceUrl(id),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetInvoiceQueryKey = (id: number,) => {
    return [
    `/api/invoices/${id}`
    ] as const;
    }


export const getGetInvoiceQueryOptions = <TData = Awaited<ReturnType<typeof getInvoice>>, TError = ErrorType<unknown>>(id: number, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getInvoice>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetInvoiceQueryKey(id);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getInvoice>>> = ({ signal }) => getInvoice(id, { signal, ...requestOptions });





   return  { queryKey, queryFn, enabled: id !== null && id !== undefined, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getInvoice>>, TError, TData> & { queryKey: QueryKey }
}

export type GetInvoiceQueryResult = NonNullable<Awaited<ReturnType<typeof getInvoice>>>
export type GetInvoiceQueryError = ErrorType<unknown>




export function useGetInvoice<TData = Awaited<ReturnType<typeof getInvoice>>, TError = ErrorType<unknown>>(
 id: number, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getInvoice>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getGetInvoiceQueryOptions(id,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







export const getUpdateInvoiceUrl = (id: number,) => {




  return `/api/invoices/${id}`
}


export const updateInvoice = async (id: number,
    invoiceUpdate: InvoiceUpdate, options?: RequestInit): Promise<Invoice> => {

  return customFetch<Invoice>(getUpdateInvoiceUrl(id),
  {
    ...options,
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(invoiceUpdate)
  }
);}




export const getUpdateInvoiceMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateInvoice>>, TError,{id: number;data: BodyType<InvoiceUpdate>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof updateInvoice>>, TError,{id: number;data: BodyType<InvoiceUpdate>}, TContext> => {

const mutationKey = ['updateInvoice'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof updateInvoice>>, {id: number;data: BodyType<InvoiceUpdate>}> = (props) => {
          const {id,data} = props ?? {};

          return  updateInvoice(id,data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type UpdateInvoiceMutationResult = NonNullable<Awaited<ReturnType<typeof updateInvoice>>>
    export type UpdateInvoiceMutationBody = BodyType<InvoiceUpdate>
    export type UpdateInvoiceMutationError = ErrorType<unknown>


export const useUpdateInvoice = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateInvoice>>, TError,{id: number;data: BodyType<InvoiceUpdate>}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof updateInvoice>>,
        TError,
        {id: number;data: BodyType<InvoiceUpdate>},
        TContext
      > => {
      return useMutation(getUpdateInvoiceMutationOptions(options));
    }

export const getDeleteInvoiceUrl = (id: number,) => {




  return `/api/invoices/${id}`
}


export const deleteInvoice = async (id: number, options?: RequestInit): Promise<void> => {

  return customFetch<void>(getDeleteInvoiceUrl(id),
  {
    ...options,
    method: 'DELETE'


  }
);}




export const getDeleteInvoiceMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteInvoice>>, TError,{id: number}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof deleteInvoice>>, TError,{id: number}, TContext> => {

const mutationKey = ['deleteInvoice'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteInvoice>>, {id: number}> = (props) => {
          const {id} = props ?? {};

          return  deleteInvoice(id,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type DeleteInvoiceMutationResult = NonNullable<Awaited<ReturnType<typeof deleteInvoice>>>

    export type DeleteInvoiceMutationError = ErrorType<unknown>


export const useDeleteInvoice = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteInvoice>>, TError,{id: number}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof deleteInvoice>>,
        TError,
        {id: number},
        TContext
      > => {
      return useMutation(getDeleteInvoiceMutationOptions(options));
    }

export const getGetInvoiceStatsUrl = () => {




  return `/api/invoices/stats`
}


export const getInvoiceStats = async ( options?: RequestInit): Promise<InvoiceStats> => {

  return customFetch<InvoiceStats>(getGetInvoiceStatsUrl(),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetInvoiceStatsQueryKey = () => {
    return [
    `/api/invoices/stats`
    ] as const;
    }


export const getGetInvoiceStatsQueryOptions = <TData = Awaited<ReturnType<typeof getInvoiceStats>>, TError = ErrorType<unknown>>( options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getInvoiceStats>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetInvoiceStatsQueryKey();



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getInvoiceStats>>> = ({ signal }) => getInvoiceStats({ signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getInvoiceStats>>, TError, TData> & { queryKey: QueryKey }
}

export type GetInvoiceStatsQueryResult = NonNullable<Awaited<ReturnType<typeof getInvoiceStats>>>
export type GetInvoiceStatsQueryError = ErrorType<unknown>




export function useGetInvoiceStats<TData = Awaited<ReturnType<typeof getInvoiceStats>>, TError = ErrorType<unknown>>(
  options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getInvoiceStats>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getGetInvoiceStatsQueryOptions(options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







export const getListExpensesUrl = (params?: ListExpensesParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : String(value))
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/api/expenses?${stringifiedParams}` : `/api/expenses`
}


export const listExpenses = async (params?: ListExpensesParams, options?: RequestInit): Promise<ExpenseList> => {

  return customFetch<ExpenseList>(getListExpensesUrl(params),
  {
    ...options,
    method: 'GET'


  }
);}





export const getListExpensesQueryKey = (params?: ListExpensesParams,) => {
    return [
    `/api/expenses`, ...(params ? [params] : [])
    ] as const;
    }


export const getListExpensesQueryOptions = <TData = Awaited<ReturnType<typeof listExpenses>>, TError = ErrorType<unknown>>(params?: ListExpensesParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof listExpenses>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getListExpensesQueryKey(params);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof listExpenses>>> = ({ signal }) => listExpenses(params, { signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof listExpenses>>, TError, TData> & { queryKey: QueryKey }
}

export type ListExpensesQueryResult = NonNullable<Awaited<ReturnType<typeof listExpenses>>>
export type ListExpensesQueryError = ErrorType<unknown>




export function useListExpenses<TData = Awaited<ReturnType<typeof listExpenses>>, TError = ErrorType<unknown>>(
 params?: ListExpensesParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof listExpenses>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getListExpensesQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







export const getCreateExpenseUrl = () => {




  return `/api/expenses`
}


export const createExpense = async (expenseInput: ExpenseInput, options?: RequestInit): Promise<Expense> => {

  return customFetch<Expense>(getCreateExpenseUrl(),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(expenseInput)
  }
);}




export const getCreateExpenseMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createExpense>>, TError,{data: BodyType<ExpenseInput>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof createExpense>>, TError,{data: BodyType<ExpenseInput>}, TContext> => {

const mutationKey = ['createExpense'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof createExpense>>, {data: BodyType<ExpenseInput>}> = (props) => {
          const {data} = props ?? {};

          return  createExpense(data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type CreateExpenseMutationResult = NonNullable<Awaited<ReturnType<typeof createExpense>>>
    export type CreateExpenseMutationBody = BodyType<ExpenseInput>
    export type CreateExpenseMutationError = ErrorType<unknown>


export const useCreateExpense = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createExpense>>, TError,{data: BodyType<ExpenseInput>}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof createExpense>>,
        TError,
        {data: BodyType<ExpenseInput>},
        TContext
      > => {
      return useMutation(getCreateExpenseMutationOptions(options));
    }

export const getUpdateExpenseUrl = (id: number,) => {




  return `/api/expenses/${id}`
}


export const updateExpense = async (id: number,
    expenseUpdate: ExpenseUpdate, options?: RequestInit): Promise<Expense> => {

  return customFetch<Expense>(getUpdateExpenseUrl(id),
  {
    ...options,
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(expenseUpdate)
  }
);}




export const getUpdateExpenseMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateExpense>>, TError,{id: number;data: BodyType<ExpenseUpdate>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof updateExpense>>, TError,{id: number;data: BodyType<ExpenseUpdate>}, TContext> => {

const mutationKey = ['updateExpense'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof updateExpense>>, {id: number;data: BodyType<ExpenseUpdate>}> = (props) => {
          const {id,data} = props ?? {};

          return  updateExpense(id,data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type UpdateExpenseMutationResult = NonNullable<Awaited<ReturnType<typeof updateExpense>>>
    export type UpdateExpenseMutationBody = BodyType<ExpenseUpdate>
    export type UpdateExpenseMutationError = ErrorType<unknown>


export const useUpdateExpense = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateExpense>>, TError,{id: number;data: BodyType<ExpenseUpdate>}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof updateExpense>>,
        TError,
        {id: number;data: BodyType<ExpenseUpdate>},
        TContext
      > => {
      return useMutation(getUpdateExpenseMutationOptions(options));
    }

export const getDeleteExpenseUrl = (id: number,) => {




  return `/api/expenses/${id}`
}


export const deleteExpense = async (id: number, options?: RequestInit): Promise<void> => {

  return customFetch<void>(getDeleteExpenseUrl(id),
  {
    ...options,
    method: 'DELETE'


  }
);}




export const getDeleteExpenseMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteExpense>>, TError,{id: number}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof deleteExpense>>, TError,{id: number}, TContext> => {

const mutationKey = ['deleteExpense'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteExpense>>, {id: number}> = (props) => {
          const {id} = props ?? {};

          return  deleteExpense(id,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type DeleteExpenseMutationResult = NonNullable<Awaited<ReturnType<typeof deleteExpense>>>

    export type DeleteExpenseMutationError = ErrorType<unknown>


export const useDeleteExpense = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteExpense>>, TError,{id: number}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof deleteExpense>>,
        TError,
        {id: number},
        TContext
      > => {
      return useMutation(getDeleteExpenseMutationOptions(options));
    }

export const getGetExpenseStatsUrl = () => {




  return `/api/expenses/stats`
}


export const getExpenseStats = async ( options?: RequestInit): Promise<ExpenseStat[]> => {

  return customFetch<ExpenseStat[]>(getGetExpenseStatsUrl(),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetExpenseStatsQueryKey = () => {
    return [
    `/api/expenses/stats`
    ] as const;
    }


export const getGetExpenseStatsQueryOptions = <TData = Awaited<ReturnType<typeof getExpenseStats>>, TError = ErrorType<unknown>>( options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getExpenseStats>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetExpenseStatsQueryKey();



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getExpenseStats>>> = ({ signal }) => getExpenseStats({ signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getExpenseStats>>, TError, TData> & { queryKey: QueryKey }
}

export type GetExpenseStatsQueryResult = NonNullable<Awaited<ReturnType<typeof getExpenseStats>>>
export type GetExpenseStatsQueryError = ErrorType<unknown>




export function useGetExpenseStats<TData = Awaited<ReturnType<typeof getExpenseStats>>, TError = ErrorType<unknown>>(
  options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getExpenseStats>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getGetExpenseStatsQueryOptions(options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







export const getGetFinancialReportUrl = (params?: GetFinancialReportParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : String(value))
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/api/reports/financial?${stringifiedParams}` : `/api/reports/financial`
}


export const getFinancialReport = async (params?: GetFinancialReportParams, options?: RequestInit): Promise<FinancialReport> => {

  return customFetch<FinancialReport>(getGetFinancialReportUrl(params),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetFinancialReportQueryKey = (params?: GetFinancialReportParams,) => {
    return [
    `/api/reports/financial`, ...(params ? [params] : [])
    ] as const;
    }


export const getGetFinancialReportQueryOptions = <TData = Awaited<ReturnType<typeof getFinancialReport>>, TError = ErrorType<unknown>>(params?: GetFinancialReportParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getFinancialReport>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetFinancialReportQueryKey(params);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getFinancialReport>>> = ({ signal }) => getFinancialReport(params, { signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getFinancialReport>>, TError, TData> & { queryKey: QueryKey }
}

export type GetFinancialReportQueryResult = NonNullable<Awaited<ReturnType<typeof getFinancialReport>>>
export type GetFinancialReportQueryError = ErrorType<unknown>




export function useGetFinancialReport<TData = Awaited<ReturnType<typeof getFinancialReport>>, TError = ErrorType<unknown>>(
 params?: GetFinancialReportParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getFinancialReport>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getGetFinancialReportQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







export const getGetProjectsReportUrl = (params?: GetProjectsReportParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : String(value))
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/api/reports/projects?${stringifiedParams}` : `/api/reports/projects`
}


export const getProjectsReport = async (params?: GetProjectsReportParams, options?: RequestInit): Promise<ProjectsReport> => {

  return customFetch<ProjectsReport>(getGetProjectsReportUrl(params),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetProjectsReportQueryKey = (params?: GetProjectsReportParams,) => {
    return [
    `/api/reports/projects`, ...(params ? [params] : [])
    ] as const;
    }


export const getGetProjectsReportQueryOptions = <TData = Awaited<ReturnType<typeof getProjectsReport>>, TError = ErrorType<unknown>>(params?: GetProjectsReportParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getProjectsReport>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetProjectsReportQueryKey(params);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getProjectsReport>>> = ({ signal }) => getProjectsReport(params, { signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getProjectsReport>>, TError, TData> & { queryKey: QueryKey }
}

export type GetProjectsReportQueryResult = NonNullable<Awaited<ReturnType<typeof getProjectsReport>>>
export type GetProjectsReportQueryError = ErrorType<unknown>




export function useGetProjectsReport<TData = Awaited<ReturnType<typeof getProjectsReport>>, TError = ErrorType<unknown>>(
 params?: GetProjectsReportParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getProjectsReport>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getGetProjectsReportQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







export const getGetEmployeesReportUrl = (params?: GetEmployeesReportParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : String(value))
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/api/reports/employees?${stringifiedParams}` : `/api/reports/employees`
}


export const getEmployeesReport = async (params?: GetEmployeesReportParams, options?: RequestInit): Promise<EmployeesReport> => {

  return customFetch<EmployeesReport>(getGetEmployeesReportUrl(params),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetEmployeesReportQueryKey = (params?: GetEmployeesReportParams,) => {
    return [
    `/api/reports/employees`, ...(params ? [params] : [])
    ] as const;
    }


export const getGetEmployeesReportQueryOptions = <TData = Awaited<ReturnType<typeof getEmployeesReport>>, TError = ErrorType<unknown>>(params?: GetEmployeesReportParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getEmployeesReport>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetEmployeesReportQueryKey(params);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getEmployeesReport>>> = ({ signal }) => getEmployeesReport(params, { signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getEmployeesReport>>, TError, TData> & { queryKey: QueryKey }
}

export type GetEmployeesReportQueryResult = NonNullable<Awaited<ReturnType<typeof getEmployeesReport>>>
export type GetEmployeesReportQueryError = ErrorType<unknown>




export function useGetEmployeesReport<TData = Awaited<ReturnType<typeof getEmployeesReport>>, TError = ErrorType<unknown>>(
 params?: GetEmployeesReportParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getEmployeesReport>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getGetEmployeesReportQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







