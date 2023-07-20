/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	Test = "test",
	User = "user",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type TestRecord = {
	field1?: string
}

export type UserRecord = {
	name?: string
	avatar?: string
	plain_password: string
	is_active?: boolean
	is_admin?: boolean
}

// Response types include system fields and match responses from the PocketBase API
export type TestResponse<Texpand = unknown> = Required<TestRecord> & BaseSystemFields<Texpand>
export type UserResponse<Texpand = unknown> = Required<UserRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	test: TestRecord
	user: UserRecord
}

export type CollectionResponses = {
	test: TestResponse
	user: UserResponse
}