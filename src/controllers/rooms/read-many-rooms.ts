import { StatusCodes } from "http-status-codes";
import { Room } from "../../entities/room/model";
import { TPaginationParams } from "../../types/pagination";
import { TReturnObj } from "../../types/returnObj";
import { sanitizeQueryParams } from "../../utils/sanitize-query-params";

export type TRoomsQueryParams = {
  status?: string;
  roomNo?: string;
} & TPaginationParams;

export const ReadManyRooms = async (
  queryParams: TRoomsQueryParams
): Promise<TReturnObj> => {
  try {
    // START : PROCESS PARAMS
    const cleanedParams = sanitizeQueryParams(queryParams);
    const {
      page = 1,
      limit = 10,
      status,
      roomNo,
    } = cleanedParams as TRoomsQueryParams;
    // END : PROCESS PARAMS

    // ----------------------------------------------------------------

    // START : APPLYING PARAMS
    const dbQuery: any = {};

    // --- SEARCH BY
    if (roomNo) {
      dbQuery.no = { $regex: roomNo, $options: "i" };
    }

    // --- FILTER BY
    if (status) {
      dbQuery.status = status.toLowerCase();
    }

    // --- PAGINATION
    const skip = (page - 1) * limit;
    // END : APPLYING PARAMS

    // ----------------------------------------------------------------

    // START : QUERYING THE DATABASE
    const results = await Room.find(dbQuery).skip(skip).limit(limit).exec();

    // --- Get total count for pagination metadata
    const totalCount = await Room.countDocuments(dbQuery);
    // END : QUERYING THE DATABASE

    // ----------------------------------------------------------------

    return {
      statusCode: StatusCodes.OK,
      data: {
        rooms: results,
        pagination: {
          total: totalCount,
          page,
          limit,
          totalPages: Math.ceil(totalCount / limit),
        },
      },
    };
  } catch (e) {
    console.log("Read Many Subscriptions Error", e);
    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      messages: ["Internal Server Error"],
    };
  }
};
