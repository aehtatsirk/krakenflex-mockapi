import { type FastifyInstance } from "fastify";
import { postSiteOutagesSchema, Reply, Params } from "./schema";
import { Reply as Outages } from "../outages/schema";
import { Reply as SiteInfo } from "../site-info/schema";

export default async (fastify: FastifyInstance) => {
  fastify.post<{ Params: Params; Body: Reply; Reply: Reply }>(
    "/:siteId",
    { schema: postSiteOutagesSchema },
    async (req, reply) => {
      // 1. Retrieves all outages from the `GET /outages` endpoint
      try {
        let outages: Outages;
        try {
          const outagesResponse = await fastify.axios.get("/outages");
          outages = outagesResponse.data;
          fastify.log.info("Retrieves outages.. ", outages);
        } catch (error: any) {
          const { status, data } = error.response;
          fastify.log.error("Error retrieving /outages.... status %s: message %s ", status, data.message);
          reply.code(status).send({ message: data.message });
          return;
        }

        // 2. Retrieves information from the `GET /site-info/{siteId}` endpoint for the site with the request param ID
        const { siteId } = req.params;
        let siteInfo: SiteInfo;
        try {
          const siteInfoResponse = await fastify.axios.get(
            `/site-info/${siteId}`
          );
          siteInfo = siteInfoResponse.data;
          fastify.log.info("Retrieves siteInfo.. ", outages);
        } catch (error: any) {
          const { status, data } = error.response;
          fastify.log.error("Error retrieving /site-info.. status %s: message %s ", status, data.message);
          reply.code(status).send({ message: data.message });
          return;
        }

        // 3. Filters out any outages that began before `2022-01-01T00:00:00.000Z` or don't have an ID that is in the list of
        // devices in the site information
        const devices = siteInfo.devices || [];
        const filteredOutages = outages.filter(
          (outage) =>
            new Date(outage.begin) >= new Date("2022-01-01T00:00:00.000Z") &&
            devices.some((device) => device.id === outage.id)
        );

        // 4. For the remaining outages, it should attach the display name of the device in the site information to each appropriate outage
        const outagesWithDeviceName = filteredOutages.map((outage) => ({
          ...outage,
          name: devices.find((device) => device.id === outage.id)?.name || "",
        }));
        fastify.log.info("Posting outagesWithDeviceName.. ", outagesWithDeviceName);

        //　5. Sends this list of outages to `POST /site-outages/{siteId}` for the site with the request ID
        await fastify.axios.post(
          `/site-outages/${siteId}`,
          outagesWithDeviceName
        );

        reply
          .code(201)
          .send({ message: "Outages successfully posted" })
          .header("Location", `/site-info/${siteId}`);

        fastify.log.info("Outages successfully posted ");
      } catch (error: any) {
        const { status, data } = error.response;
        reply.code(status).send({ message: data.message });
        fastify.log.error("Error posting /site-outages.. status %s: message %s ", status, data.message);
      }
    }
  );
};
