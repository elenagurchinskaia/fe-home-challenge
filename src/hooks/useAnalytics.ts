import { AnalyticsModule } from "./../utils/analytics-module";
// define a type for the payload to improve type safety
type AnalyticsPayload = Record<string, any>;

export const useAnalytics = () => {
  const client = {
    capture: (eventName: string, payload: AnalyticsPayload) => {
      try {
        // log the event for debugging
        console.log(`Capturing event: ${eventName}`, payload);

        // capture the analytics event
        AnalyticsModule.capture(eventName, payload);
      } catch (error) {
        console.error(`Failed to capture event: ${eventName}`, error);
      }
    },
  };

  return { client };
};
