export interface IAvailableLmcOwner {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  phone: string;
  role: string;
  is_active: boolean;
  photo: string | null;
}

export interface ILmcOperational {
  snapshot_date: string | null;
  active: number;
  passive: number;
  inactive: number;
  recover: number;
  no_use: number;
  writers_total: number;
  pos_issued: number;
  pos_trading: number;
  pos_recovery: number;
}

export interface ILmcFinancial {
  wallet_balance: string;
  monthly_topups: string;
  monthly_sales: string;
  monthly_commissions: string;
}

export interface ILmcDetailCard {
  id: string;
  code: string;
  name: string;
  phone: string;
  address: string;
  photo_url: string | null;
  is_active: boolean;
  operational: ILmcOperational;
  financial: ILmcFinancial;
}

export interface IRegisterLmcPayload {
  owner: string;
  address?: string;
  is_active?: boolean;
}

export interface ILmcRegisterResponse {
  id: string;
  code: string;
  name: string;
  phone: string;
  address: string;
  owner: {
    id: string;
    full_name: string;
    phone: string;
    photo: string | null;
  };
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ILmcOwnerOption {
  id: string;
  code: string;
  address: string;
  is_active: boolean;
  owner_email: string;
  owner_phone: string;
  owner_full_name: string;
  created_at: string;
}

export interface IRegisterLmcOnboardingPayload {
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  password: string;
  address?: string;
  photo?: File;
}

export interface ILmcWriterOverviewRow {
  id: string;
  name: string;
  contact: string;
  sign_up_date: string;
  dop: number;
  dot: number;
  ytd_sales: string;
  ytd_topups: string;
  status: string;
}

export interface ILmcTransactionsParams {
  type?: string;
  search?: string;
  date_from?: string;
  date_to?: string;
  page?: number;
  page_size?: number;
}

export interface ILmcTransactionRow {
  date: string;
  time: string;
  type: string;
  source_name: string | null;
  source_phone: string | null;
  reference: string | null;
  amount: string;
  balance: string;
}

export interface ILmcSummaryInfo {
  name: string;
  address: string;
  phone: string;
  pos_issued: number;
  pos_trading: number;
  wallet_balance: number;
}

export interface ILmcSummaryData {
  ytd_sales: number;
  ytd_topups: number;
  ytd_winnings: number;
  writers_count: number;
  ytd_sales_ratio: number;
  ytd_topups_ratio: number;
  ytd_winnings_ratio: number;
  writers_ratio: number;
  wallet_balance: number;
  today_deposits: number;
}

export interface ILmcSummary {
  lmc_info: ILmcSummaryInfo;
  summary: ILmcSummaryData;
}
