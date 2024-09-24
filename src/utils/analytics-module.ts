export const AnalyticsModule = {
  capture: (eventName: string, payload: any): void => {
    console.log(`Event: ${eventName}`, payload);
  },
};
