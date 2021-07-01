import { accounts } from "./accounts";
import { MUTATIONS, PAYDOWN_METHODS, ACTIONS, GETTERS } from "./consts";
import { chartData } from "./chartData";
import { plotlyConfig, CreateTrace } from "./plotlyConfig";

export { accounts };
export { MUTATIONS };
export { PAYDOWN_METHODS };
export { chartData };
export { plotlyConfig };
export { CreateTrace };
export { ACTIONS };
export { GETTERS };

export default {
  accounts,
  MUTATIONS,
  ACTIONS,
  PAYDOWN_METHODS,
  chartData,
  plotlyConfig,
  GETTERS,
  CreateTrace
};
