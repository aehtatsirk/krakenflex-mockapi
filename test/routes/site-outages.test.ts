import { test } from 'tap'
import Fastify, { FastifyInstance } from 'fastify';
import app from "../../src/app";
import AxiosMockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { outagesResponse, siteInfoMockResponse } from './../mock-data';

const testApp: FastifyInstance = Fastify();
testApp.register(app);

const successResponse = {message: "Outages successfully posted"};

const mockAdapter = new AxiosMockAdapter(axios);

test('site outages is posted', async (t) => {
  const siteId = 'pear-tree';
  mockAdapter.onGet('/outages').reply(200, outagesResponse);
  mockAdapter.onGet(`/site-info/${siteId}`).reply(200, siteInfoMockResponse);

  mockAdapter.onPost(`/site-outages/${siteId}`).reply(201, successResponse);
  const res = await testApp.inject({
    method: 'POST',
    url: `/site-outages/${siteId}`,
  })

  t.equal(res.statusCode, 201);

  t.same(res.json(), successResponse)
})

test('404 no data found', async (t) => {

  const notFoundRequest = {"message":"No data found"};
  const invalidSiteID = 'pear-tree11111';
  mockAdapter.onGet('/outages').reply(200, outagesResponse);
  mockAdapter.onGet(`/site-info/${invalidSiteID}`).reply(404, notFoundRequest);
  mockAdapter.onPost(`/site-outages/${invalidSiteID}`).reply(404, notFoundRequest);
  const res = await testApp.inject({
    method: 'POST',
    url: `/site-outages/${invalidSiteID}`,
  })

  t.equal(res.statusCode, 404);

  t.same(res.json(),  notFoundRequest)
})
