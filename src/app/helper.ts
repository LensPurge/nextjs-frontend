// @ts-ignore
import omitDeep from 'omit-deep';

// helper
export const omit = (object: any, name: string) => {
    return omitDeep(object, name);
}
