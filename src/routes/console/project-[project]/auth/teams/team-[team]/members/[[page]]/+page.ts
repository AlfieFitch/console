import { Query } from '@aw-labs/appwrite-console';
import { sdkForProject } from '$lib/stores/sdk';
import { pageToOffset } from '$lib/helpers/load';
import { Dependencies, PAGE_LIMIT } from '$lib/constants';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, parent, depends, url }) => {
    await parent();
    depends(Dependencies.MEMBERSHIPS);
    const teamId = params.team;
    const page = Number(params.page);
    const offset = pageToOffset(page, PAGE_LIMIT);
    const search = url.search.slice(1) ?? undefined;

    return {
        offset,
        search,
        memberships: await sdkForProject.teams.listMemberships(
            teamId,
            [Query.limit(PAGE_LIMIT), Query.offset(offset), Query.orderDesc('$createdAt')],
            search
        )
    };
};
