import { test } from 'tap'
import Fastify, { FastifyInstance } from 'fastify';
import app from "../../src/app";
import AxiosMockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { siteInfoMockResponse } from './../mock-data';

const testApp: FastifyInstance = Fastify();
testApp.register(app);

const mockAdapter = new AxiosMockAdapter(axios);

test('siteInfo is loaded', async (t) => {
  const siteId = 'pear-tree';

  mockAdapter.onGet(`/site-info/${siteId}`).reply(200, siteInfoMockResponse);
  const res = await testApp.inject({
    method: 'GET',
    url: `/site-info/${siteId}`,
  })

  t.equal(res.statusCode, 200);

  t.same(res.json(), siteInfoMockResponse)
})

test('400 invalid siteID', async (t) => {

  const badRequest = {message:"Bad Request"};
  const invalidSiteID = 'pear-tree11111';

  mockAdapter.onGet(`/site-info/${invalidSiteID}`).reply(400, badRequest);
  const res = await testApp.inject({
    method: 'GET',
    url: `/site-info/${invalidSiteID}`,
  })

  t.equal(res.statusCode, 400);

  t.same(res.json(), badRequest)
})
