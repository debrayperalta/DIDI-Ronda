import React from "react";
import { Provider } from "react-redux";
import { Root } from "native-base";
import { MenuProvider } from "react-native-popup-menu";
import store from "./src/store/store";
import Nav from "./src/components/components/navigation/Nav";
import NavigationService from "./src/services/navigation";

import PushNotification from "react-native-push-notification";
import * as roundaActions from "./src/actions/rounds";
import { NavigationActions } from "react-navigation";

import moment from "moment";
import "moment/locale/es";
moment.locale("es");

const App = () => {
  PushNotification.configure({
    onNotification: function(notification) {
      console.log("Notificacion", notification);
      if (!notification.userInteraction) {
        const notificationObject = {
          title: notification.title,
          message: notification.message,
          channelId: "ronda",
          foreground: true,
          userInteraction: false,
          data: notification.data,
        };

        PushNotification.localNotification(notificationObject);
      }

      if (
        notification.userInteraction &&
        notification.data &&
        notification.data.action
      ) {
        const { routeName, params } = JSON.parse(notification.data.action);
        store.dispatch(roundaActions.loadRounds());
        navigator.dispatch(NavigationActions.navigate({ routeName, params }));
      }
    },

    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError: function(err) {
      console.error(err.message, err);
    },
    popInitialNotification: false,
    senderID: "323695863108",
    requestPermissions: true,
  });

  return (
    <Provider store={store}>
      <MenuProvider>
        <Root>
          <Nav
            ref={nav => {
              navigator = nav;
              NavigationService.setTopLevelNavigator(nav);
            }}
          />
        </Root>
      </MenuProvider>
    </Provider>
  );
};

export default App;
