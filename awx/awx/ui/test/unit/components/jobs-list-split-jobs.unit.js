describe('View: Split Jobs List', () => {
    let JobList;
    let scope;
    let state;
    let Dataset;
    let resolvedModels;
    let JobsStrings;
    let QuerySet;
    let Prompt;
    let filter;
    let ProcessErrors;
    let Wait;
    let Rest;
    let SearchBasePath;

    beforeEach(angular.mock.module('at.features.jobs', ($provide) => {
        Dataset = {
            data: {
                results: {}
            }
        };
        state = {
            params: {
                job_search: {}
            },
            go: jasmine.createSpy('go'),
            includes: jasmine.createSpy('includes')
        };
        resolvedModels = [
            {
                options: () => ['foo', 'bar'],
            }
        ];
        JobsStrings = {
            get: (str) => {
                if (str === 'list.SLICE_JOB') {
                    return 'Slice Job';
                }
                return '';
            }
        };

        ProcessErrors = jasmine.createSpy('ProcessErrors');
        Wait = jasmine.createSpy('Wait');
        Prompt = jasmine.createSpy('Prompt');

        $provide.value('state', state);
        $provide.value('Dataset', Dataset);
        $provide.value('resolvedModels', resolvedModels);
        $provide.value('ProcessErrors', ProcessErrors);
        $provide.value('Wait', Wait);
        $provide.value('Prompt', Prompt);
        $provide.value('Rest', angular.noop);
        $provide.value('SearchBasePath', '');
        $provide.value('JobsStrings', JobsStrings);
        $provide.value('QuerySet', angular.noop);

        $provide.provider('$stateProvider', { $get: jasmine.createSpy('$get'), });
        $provide.value('$stateExtender', { addState: jasmine.createSpy('addState'), });
    }));

    beforeEach(angular.mock.inject((
        $controller, $rootScope, _state_, _Dataset_, _resolvedModels_, _JobsStrings_,
        _QuerySet_, _Prompt_, _$filter_, _ProcessErrors_, _Wait_, _Rest_, _SearchBasePath_
    ) => {
        scope = $rootScope.$new();
        state = _state_;
        Dataset = _Dataset_;
        resolvedModels = _resolvedModels_;
        JobsStrings = _JobsStrings_;
        QuerySet = _QuerySet_;
        Prompt = _Prompt_;
        filter = _$filter_;
        ProcessErrors = _ProcessErrors_;
        Wait = _Wait_;
        Rest = _Rest_;
        SearchBasePath = _SearchBasePath_;

        JobList = $controller('jobsListController', {
            $scope: scope,
            $state: state,
            Dataset,
            resolvedModels,
            JobsStrings,
            ProcessErrors,
            QuerySet,
            Wait,
            Prompt,
            $filter: filter,
            Rest,
            SearchBasePath,
        });
    }));

    describe('JobList Controller', () => {
        it('is created successfully', () => {
            expect(JobList).toBeDefined();
        });
        it('has method "getSplitJobDetails"', () => {
            expect(JobList.getSliceJobDetails).toBeDefined();
        });
        it('returns a string', () => {
            const data = {
                job_slice_number: 1,
                job_slice_count: 2
            };
            const result = JobList.getSliceJobDetails(data);
            expect(result).toEqual('Slice Job 1/2');
        });
        it('returns null when data is null', () => {
            const data = {
                job_slice_number: null,
                job_slice_count: null
            };
            const result = JobList.getSliceJobDetails(data);
            expect(result).toBeNull();
        });
        it('returns null when data is undefined', () => {
            const data = {
                job_slice_number: undefined,
                job_slice_count: undefined
            };
            const result = JobList.getSliceJobDetails(data);
            expect(result).toBeNull();
        });
        it('returns null when job is not a sliced job', () => {
            const data = {
                job_slice_number: null,
                job_slice_count: 1
            };
            const result = JobList.getSliceJobDetails(data);
            expect(result).toBeNull();
        });
    });
});
