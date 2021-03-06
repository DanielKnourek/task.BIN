export interface ShardsResponse {
    total: number;
    successful: number;
    failed: number;
    skipped?: number;
}

export interface Explanation {
    value: number;
    description: string;
    details: Explanation[];
}

export interface SearchResponse<T> {
    took: number;
    timed_out: boolean;
    _scroll_id?: string;
    _shards: ShardsResponse;
    hits: {
        total: number;
        max_score: number;
        hits: Array<{
            _index: string;
            _type: string;
            _id: string;
            _score: number;
            _source: T;
            _version?: number;
            _explanation?: Explanation;
            fields?: any;
            highlight?: any;
            inner_hits?: any;
            matched_queries?: string[];
            sort?: string[];
        }>;
    };
    aggregations?: any;
}

export interface IndexResponse {
    _index: string;
    _type: string;
    _id: string;
    _version?: number;
    result: string;
    _shards: ShardsResponse;
    _seq_no: number;
    _primary_term: number;
}

export interface UpdateResponse {
    _index: string;
    _type: string;
    _id: string;
    _version?: number;
    result: string; // updated
    _shards: ShardsResponse;
    _seq_no: number;
    _primary_term: number;
}
