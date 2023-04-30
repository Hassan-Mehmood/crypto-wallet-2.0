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
