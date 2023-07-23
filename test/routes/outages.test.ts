import { test } from 'tap'
import Fastify, { FastifyInstance } from 'fastify';
import app from "./../../src/app";
import AxiosMockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { outagesResponse } from './../mock-data';

const testApp: FastifyInstance = Fastify();
testApp.register(app);

const mockAdapter = new AxiosMockAdapter(axios);

test('outages is loaded', async (t) => {

  mockAdapter.onGet('/outages').reply(200, outagesResponse);
  const res = await testApp.inject({
    method: 'GET',
    url: '/outages',
  })

  t.equal(res.statusCode, 200, 'Status code should be 200');

  t.same(res.json(), outagesResponse)
})

test('forbidden', async (t) => {

  const forbiddenResponse = {message: "Forbidden"};

  mockAdapter.onGet('/outages').reply(403, forbiddenResponse);
  const res = await testApp.inject({
    method: 'GET',
    url: '/outages',
  })

  t.equal(res.statusCode, 403, 'Status code should be 403');

  t.same(res.json(), forbiddenResponse)
})
