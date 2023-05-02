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
