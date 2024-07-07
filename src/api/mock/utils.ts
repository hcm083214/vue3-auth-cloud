import Mock from "mockjs";
const Random = Mock.Random;

interface RandomDataGenerator {
    string(min: number, max: number): string;
    natural(min: number, max: number): number;
    datetime(): string;
}

export const mockRandomGenerator: RandomDataGenerator = {
    string(min, max) { return Random.string(min, max); },
    natural(min, max) { return Random.natural(min, max); },
    datetime() { return Random.datetime(); },
};

export function mockData<T>(mockDataSize: number, dataMakerFn: (randomDataGenerator:RandomDataGenerator) => T, ) {
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