## implementing connectivityService

Steps:
1. create Generic Http Handler

Demo: HttpHandler.ts

export class HttpHandler {
    private httpClient: any;

    constructor(httpClient: any)
}



1. Create IConnectivityService and ConnectivityService

Demo: ConnectivityServices.ts

import {HttpHandler} from  '@common/http/HttpHandler';













1. create Factory.ts file

Demo: Factory.ts

import{ AuxillaryService } from '@/services/http';
import IConnectivityService from '@/services/http/ConnectivityService
import { AuhService, AzureAuthService} from '@/services/auth';