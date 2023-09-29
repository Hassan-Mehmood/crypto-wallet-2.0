export type TrendingCoin = {
  item: {
    id: string;
    coin_id: number;
    name: string;
    symbol: string;
    market_cap_rank: number;
    thumb: string;
    small: string;
    large: string;
    slug: string;
    price_btc: number;
    score: number;
  };
};

export type GlobalData = {
  data: {
    active_cryptocurrencies: number;
    upcoming_icos: number;
    ongoing_icos: number;
    ended_icos: number;
    markets: number;
    total_market_cap: {
      [key: string]: number;
    };
    total_volume: {
      [key: string]: number;
    };
    market_cap_percentage: {
      [key: string]: number;
    };
    market_cap_change_percentage_24h_usd: number;
    updated_at: number;
  };
};

export interface HomeTableCoin {
  id: string;
  symbol: string;
  name: string;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  circulating_supply: number;
  current_price: number;
  fully_diluted_valuation: number;
  high_24h: number;
  image: string;
  last_updated: string;
  low_24h: number;
  market_cap: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  market_cap_rank: number;
  max_supply: number;
  name: string;
  price_change_24h: number;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
  roi: null;
  symbol: string;
  total_supply: number;
  total_volume: number;
}

export type SignUpFormDataType = {
  name: string;
  email: string;
  password: string;
  confirmPass: string;
};

export type FormErrorsType = {
  [key: string]: string;
};

export type ServerSignupResponseError = {
  stack: string;
  message: string;
  name: string;
  code: string;
  config: {
    [key: string]: any;
  };
  request: XMLHttpRequest;
  response: {
    [key: string]: any;
  };
};

export type LoginFormDataType = {
  email: string;
  password: string;
};

export type SearchCoin = {
  id: string;
  name: string;
  api_symbol: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  large: string;
};

export type getCoinMarketDataType = {
  id: string;
  symbol: string;
  name: string;
  asset_platform_id?: string;
  platforms?: {
    [key: string]: string;
  };
  detail_platforms?: {
    [key: string]: {
      decimal_place: number;
      contract_address: string;
    };
  };
  block_time_in_minutes: number;
  hashing_algorithm: string;
  categories?: string[];
  public_notice?: string;
  additional_notices?: string[];
  description?: {
    en: string;
  };
  links?: {
    homepage: string[];
    blockchain_site: string[];
    official_forum_url: string[];
    chat_url: string[];
    announcement_url: string[];
    twitter_screen_name: string;
    facebook_username: string;
    bitcointalk_thread_identifier?: string;
    telegram_channel_identifier?: string;
    subreddit_url: string;
    repos_url: {
      github?: string[];
      bitbucket?: string[];
    };
  };
  image?: {
    thumb: string;
    small: string;
    large: string;
  };
  country_origin?: string;
  genesis_date: string;
  sentiment_votes_up_percentage: number;
  sentiment_votes_down_percentage: number;
  watchlist_portfolio_users: number;
  market_cap_rank: number;
  coingecko_rank: number;
  coingecko_score: number;
  developer_score: number;
  community_score: number;
  liquidity_score: number;
  public_interest_score: number;
  market_data?: {
    current_price?: {
      [key: string]: number;
    };
    total_value_locked?: number;
    mcap_to_tvl_ratio?: number;
    fdv_to_tvl_ratio?: number;
    roi?: number;
    ath?: {
      [key: string]: number;
    };
    ath_change_percentage?: {
      [key: string]: number;
    };
    ath_date?: {
      [key: string]: string;
    };
  };
};

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  coins: Coin[];
}
interface Coin {
  id: number;
  name: string;
  apiId: string;
  apiSymbol: string;
  symbol: string;
  thump: string;
  profitLoss: number;
  cost: number;
  averageNetCost: number;
  averageBuyPrice: number;
  latestPrice: number;
  totalQuantity: number;
  holdingsInDollers: number;
  large: string;
  marketCapRank: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  transactions: Transaction[];
}

interface Transaction {
  id: number;
  price: number;
  quantity: number;
  timeBought: Date;
  coinId: number;
}

interface UserTransactionsData {
  _allTimeProfit: number;
  portfolioWorth: number;
  cryptoBalance: number;
  dollerBalance: number;

  bestPerformer: {
    value: number;
    thump: string;
  };
  worstPerformer: {
    value: number;
    thump: string;
  };
  coins: {
    id: number;
    name: string;
    apiId: string;
    apiSymbol: string;
    symbol: string;
    thump: string;
    large: string;
    marketCapRank: number;
    averageNetCost: number;
    averageBuyPrice: number;
    latestPrice: number;
    totalQuantity: number;
    holdingsInDollers: number;
    cost: number;
    profitLoss: number;
    totalInvestment: number;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
    transactions: {
      id: number;
      price: number;
      quantity: number;
      timeBought: Date;
      createdAt: Date;
      updatedAt: Date;
    }[];
  }[];
}

export interface userAccountBalance {
  dollerBalance: number;
  cryptoBalance: number;
}

// id, api_symbol, market_cap_rank, thumb, large
export interface coinTransaction {
  coin: Coin;
  transactions: Transaction[];
}

interface Transaction {
  coinId: number;
  createdAt: string;
  id: number;
  type: string;
  date: Date;
  price: number;
  quantity: number;
  timeBought: string;
  updatedAt: string;
}
