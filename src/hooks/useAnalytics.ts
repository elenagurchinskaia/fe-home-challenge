import { AnalyticsModule } from "./../utils/analytics-module";

export const useAnalytics = () => {
  const client = {
    capture: (eventName: string, payload: any) => {
      AnalyticsModule.capture(eventName, payload);
    },
  };

  return { client };
};
