import { BACKGROUND_SCRIPT_NAME, POPUP_SCRIPT_NAME } from '@fuels-wallet/sdk';
import { JSONRPCServer } from 'json-rpc-2.0';

import type { RequestMessage, ResponseMessage } from '~/systems/CRX/types';
import { EventTypes } from '~/systems/CRX/types';

export class RPCService {
  readonly server: JSONRPCServer;
  readonly connection: chrome.runtime.Port;

  constructor() {
    this.server = new JSONRPCServer();
    this.connection = chrome.runtime.connect(chrome.runtime.id, {
      name: BACKGROUND_SCRIPT_NAME,
    });
    this.setupListeners();
    this.ready();
  }

  ready() {
    this.connection.postMessage({
      target: BACKGROUND_SCRIPT_NAME,
      type: EventTypes.uiEvent,
      ready: true,
    });
  }

  setupListeners() {
    this.connection.onMessage.addListener(this.onMessage);
  }

  onMessage = (message: RequestMessage) => {
    if (message.target === POPUP_SCRIPT_NAME) {
      this.server.receive(message.request).then((response) => {
        if (response) {
          const responseMessage: ResponseMessage = {
            id: message.id,
            target: BACKGROUND_SCRIPT_NAME,
            type: EventTypes.response,
            response,
          };
          this.connection.postMessage(responseMessage);
        }
      });
    }
  };

  destroy() {
    this.connection.disconnect();
  }
}

//   server.addMethod('requestAuthorization', async (params: any) => {
//     const origin = params?.origin;
//     if (origin) {
//       applicationService.send(ExternalAppEvents.connect, {
//         data: {
//           origin,
//         },
//       });
//       try {
//         const app = await waitFor(
//           applicationService,
//           (state) => {
//             return state.matches('connected');
//           },
//           {
//             timeout: 60 * 1000 * 5,
//           }
//         );
//         return !!app;
//       } catch (err: any) {
//         window.close();
//         throw new Error('User didnt reject in under than 5 minutes');
//       }
//     }
//     return false;
//   });
