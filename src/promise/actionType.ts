export type ResolveType = (resolve_success: any) => any;
export type RejectType = (reject_fail?: any) => any;

export type StatusType = 'pending' | 'fulfilled' | 'rejected';

export type ExecutorType = (resolve: ResolveType, reject: RejectType) => void;
