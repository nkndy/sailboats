"use strict";
/*!
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/*!
 * @module commonGrpc/operation
 */
const common_1 = require("@google-cloud/common");
/**
 * @type {module:commonGrpc/service}
 * @private
 */
const service_1 = require("./service");
/**
 * @type {module:commonGrpc/serviceObject}
 * @private
 */
const service_object_1 = require("./service-object");
class GrpcOperation extends service_object_1.GrpcServiceObject {
    /**
     * An Operation object allows you to interact with APIs that take longer to
     * process things.
     *
     * @constructor
     * @alias module:common/grpcOperation
     *
     * @param {module:commonGrpc/service|module:commonGrpc/serviceObject} parent - The
     *     parent object. This should be configured to use the
     * longrunning.operation service.
     * @param {string} name - The operation name.
     */
    constructor(parent, name) {
        const methods = {
            /**
             * Deletes an operation.
             */
            delete: {
                protoOpts: {
                    service: 'Operations',
                    method: 'deleteOperation',
                },
                reqOpts: {
                    name,
                },
            },
            /**
             * Checks to see if an operation exists.
             */
            exists: true,
            /**
             * Retrieves the operation.
             */
            get: true,
            /**
             * Retrieves metadata for the operation.
             */
            getMetadata: {
                protoOpts: {
                    service: 'Operations',
                    method: 'getOperation',
                },
                reqOpts: {
                    name,
                },
            },
        };
        const config = {
            parent,
            id: name,
            methods,
        };
        super(config);
        this.completeListeners = 0;
        this.hasActiveListeners = false;
        this.listenForEvents_();
    }
    /**
     * Cancel the operation.
     *
     * @param {function=} callback - The callback function.
     * @param {?error} callback.err - An error returned while making this
     *     request.
     * @param {object} callback.apiResponse - The full API response.
     */
    cancel(callback) {
        const protoOpts = {
            service: 'Operations',
            method: 'cancelOperation',
        };
        const reqOpts = {
            // TODO: remove this when upgrading to the latest @google-cloud/common
            name: this.id,
        };
        this.request(protoOpts, reqOpts, callback || common_1.util.noop);
    }
    /**
     * Poll for a status update. Execute the callback:
     *
     *   - callback(err): Operation failed
     *   - callback(): Operation incomplete
     *   - callback(null, metadata): Operation complete
     *
     * @private
     *
     * @param {function} callback
     */
    poll_() {
        return new Promise((resolve, reject) => {
            this.getMetadata((err, resp) => {
                if (err || resp.error) {
                    reject(err || service_1.GrpcService.decorateError_(resp.error));
                    return;
                }
                if (!resp.done) {
                    resolve();
                    return;
                }
                resolve(resp);
            });
        });
    }
    /**
     * Begin listening for events on the operation. This method keeps track of how
     * many "complete" listeners are registered and removed, making sure polling
     * is handled automatically.
     *
     * As long as there is one active "complete" listener, the connection is open.
     * When there are no more listeners, the polling stops.
     *
     * @private
     */
    listenForEvents_() {
        this.on('newListener', (event) => {
            if (event === 'complete') {
                this.completeListeners++;
                if (!this.hasActiveListeners) {
                    this.hasActiveListeners = true;
                    this.startPolling_();
                }
            }
        });
        this.on('removeListener', (event) => {
            if (event === 'complete' && --this.completeListeners === 0) {
                this.hasActiveListeners = false;
            }
        });
    }
    /**
     * Poll `getMetadata` to check the operation's status. This runs a loop to
     * ping the API on an interval.
     *
     * Note: This method is automatically called once a "complete" event handler
     * is registered on the operation.
     *
     * @private
     */
    startPolling_() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.hasActiveListeners) {
                return;
            }
            try {
                const metadata = yield this.poll_();
                if (!metadata) {
                    setTimeout(this.startPolling_.bind(this), 500);
                    return;
                }
                this.emit('complete', metadata);
            }
            catch (err) {
                this.emit('error', err);
            }
        });
    }
}
exports.GrpcOperation = GrpcOperation;
//# sourceMappingURL=operation.js.map