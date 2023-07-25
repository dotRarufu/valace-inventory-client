/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	Item = "item",
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

export enum ItemTypeOptions {
	"Furniture" = "Furniture",
	"IT" = "IT",
	"Office" = "Office",
}
export type ItemRecord = {
	name: string
	quantity?: number
	location: string
	supplier?: string
	is_available?: boolean
	remarks?: string
	type: ItemTypeOptions
	images?: string[]
	property_number: string
	serial_number: string
}

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
export type ItemResponse<Texpand = unknown> = Required<ItemRecord> & BaseSystemFields<Texpand>
export type TestResponse<Texpand = unknown> = Required<TestRecord> & BaseSystemFields<Texpand>
export type UserResponse<Texpand = unknown> = Required<UserRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	item: ItemRecord
	test: TestRecord
	user: UserRecord
}

export type CollectionResponses = {
	item: ItemResponse
	test: TestResponse
	user: UserResponse
}