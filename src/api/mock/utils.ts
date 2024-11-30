import Mock from "mockjs";
import type { MockjsRequestOptions } from 'mockjs'
const Random = Mock.Random;

import { getPathQuery } from "@/utils/index";

interface RandomDataGenerator {
    string(min: number, max: number): string;
    natural(min: number, max: number): number;
    datetime(): string;
    url(): string,
    increment():number,
}

export const mockRandomGenerator: RandomDataGenerator = {
    string(min, max) { return Random.string(min, max); },
    natural(min, max) { return Random.natural(min, max); },
    datetime() { return Random.datetime(); },
    url() {
        return Random.url();
    },
    increment() {
        return Random.increment();
    },
};

type DataMakerFn<T> = (randomDataGenerator: RandomDataGenerator) => T

function mockData<T>(mockDataSize: number, dataMakerFn: DataMakerFn<T>,) {
    if (mockDataSize < 0 || isNaN(mockDataSize)) {
        throw new Error("responseSize must be a non-negative number.");
    }
    const results: T[] = [];
    for (let i = 0; i < mockDataSize; i++) {
        try {
            const data = dataMakerFn(mockRandomGenerator);
            results.push(data);
        } catch (error) {
            console.error(`Error generating mock data for item ${i + 1}: ${error}`);
        }
    }
    return results;
}

export function mockPageData<T>(queryOptions: MockjsRequestOptions, fn: DataMakerFn<T>) {
    const queryObj = getPathQuery(queryOptions.url);
    const size = +queryObj.size || 10;
    const current = +queryObj.current || 1;
    const minTotal = size * current;
    const total = Random.natural(minTotal, Random.natural(minTotal, minTotal + 1000));
    const responseList = mockData(size, fn)

    return Mock.mock({
        code: 200,
        msg: "success",
        data: {
            total, // 查询列表总记录数
            current, // 当前页
            size, // 每页显示条数
            pages: Math.ceil(total / size), // 总页数
            records: responseList // 查询数据列表
        }
    })
}