export interface IWriterContact {
  email: string | null;
  phone: string;
}

export interface IWriterInfo {
  id: string;
  name: string;
  profileImage: string | null;
  online: boolean;
  lastSeen: string;
  contact: IWriterContact;
}

export interface IWriterStatisticRow {
  sales: string;
  total_stakes: string;
  topup: string;
  writer: IWriterInfo;
}

export interface IWriterStatisticsData {
  totalwriterFloat: string;
  totalwriters: string;
  writers: IWriterStatisticRow[];
}

export interface IWriterStatisticsResponse {
  data: IWriterStatisticsData;
}

export interface IAvailableFloat {
  available_float: string;
  available_float_amount: number;
  currency: string;
}

export interface ITodayTopUp {
  date: string;
  total_topup: string;
  total_topup_amount: number;
  topup_count: number;
  currency: string;
}

export interface IFormattedAmountPair {
  formatted: string;
  amount: number;
}

export interface ITop10Writer {
  rank: number;
  writer_id: number;
  writer_name: string;
  photo_url: string | null;
  total_wins: IFormattedAmountPair;
  total_topups: IFormattedAmountPair;
  net_profit: IFormattedAmountPair;
  ticket_count: number;
}

export interface IWriterListRow {
  id: string;
  writer_id_display: string;
  name: string;
  contact: string;
  sign_up_date: string;
  days_on_platform: number;
  days_of_tickets: number;
  ytd_sales: string;
  ytd_topups: string;
  last_transaction_date: string;
  status: string;
  photo_url?: string | null;
}

export interface IPaginatedResults<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface IWriterEditData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  photo_url: string | null;
}

export interface IWriterEditPayload {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  photo?: File | null;
}

export interface IWriterProfile {
  id: string;
  writer_id_display: string;
  name: string;
  gender: string;
  lmc_name: string;
  date_of_birth: string;
  mobile: string;
  email: string;
  status: string;
  serial_number: string;
  terminal_number: string;
  device_state: string;
  days_on_platform: number;
  days_of_tickets: number;
  lt_avg_sale: string;
  sign_up_date: string;
  sales_wallet_balance: string;
  sales_wallet_id: string;
  claims_wallet_balance: string;
  claims_wallet_id: string;
  ytd_sales: string;
  this_month_sales: string;
  ytd_topups: string;
  this_month_topups: string;
  ytd_winnings: string;
  this_month_winnings: string;
  ranking_tier: string;
  avg_topup: string;
}

export interface IWriterSaleRow {
  ticket_no: string;
  date: string;
  time: string;
  event_number: number;
  game: string;
  play: string;
  amount_paid: string;
  stakes: number;
}

export interface IWriterTopupRow {
  date: string;
  time: string;
  source: string | null;
  network: string;
  bank_batch_ref: string | null;
  transaction_ref: string | null;
  amount: string;
  balance: string;
}

export interface IWriterWinningRow {
  ticket_id: string;
  ticket_number: string;
  event_number: number;
  game: string;
  play: string;
  datetime: string;
  stake_amount: string;
  amount_won: string;
}

export interface IWriterCashoutRow {
  date: string;
  time: string;
  source: string;
  network: string;
  bank_batch_ref: string | null;
  transaction_ref: string | null;
  amount: string;
  balance: string;
}

export interface IActiveWriterDailyStats {
  totals: {
    total_writers: number;
    active_writers: number;
  };
  download_url?: string;
  period: {
    start_date: string;
    end_date: string;
    days: number;
  };
  days: Array<{
    day: string;
    total_writers: number;
    active_writers: number;
  }>;
  months?: Array<{
    month: string;
    total_writers: number;
    active_writers: number;
  }>;
}

export interface IRegisterWriterPayload {
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  password: string;
  lmc_id: string;
  date_of_birth: string;
  location_address?: string;
  photo?: File;
}

export interface IRegisterWriterResponse {
  user: {
    id: string;
    email: string;
    full_name: string;
    role: string;
    phone: string;
  };
  writer: {
    id: string;
    lmc: string;
    photo: string | null;
    status: string;
    writer_id: number;
    date_of_birth: string;
    location_address: string;
    has_bound_device: boolean;
    created_at: string;
    updated_at: string;
  };
  message: string;
}
