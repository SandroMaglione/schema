---
title: AST.ts
nav_order: 3
parent: Modules
---

## AST overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [annotations](#annotations)
  - [Annotated (interface)](#annotated-interface)
  - [Annotations (interface)](#annotations-interface)
  - [BrandAnnotation (type alias)](#brandannotation-type-alias)
  - [BrandAnnotationId](#brandannotationid)
  - [DefaultAnnotation (type alias)](#defaultannotation-type-alias)
  - [DefaultAnnotationId](#defaultannotationid)
  - [DescriptionAnnotation (type alias)](#descriptionannotation-type-alias)
  - [DescriptionAnnotationId](#descriptionannotationid)
  - [DocumentationAnnotation (type alias)](#documentationannotation-type-alias)
  - [DocumentationAnnotationId](#documentationannotationid)
  - [ExamplesAnnotation (type alias)](#examplesannotation-type-alias)
  - [ExamplesAnnotationId](#examplesannotationid)
  - [IdentifierAnnotation (type alias)](#identifierannotation-type-alias)
  - [IdentifierAnnotationId](#identifierannotationid)
  - [JSONSchemaAnnotation (type alias)](#jsonschemaannotation-type-alias)
  - [JSONSchemaAnnotationId](#jsonschemaannotationid)
  - [MessageAnnotation (type alias)](#messageannotation-type-alias)
  - [MessageAnnotationId](#messageannotationid)
  - [TitleAnnotation (type alias)](#titleannotation-type-alias)
  - [TitleAnnotationId](#titleannotationid)
  - [TypeAnnotation (type alias)](#typeannotation-type-alias)
  - [TypeAnnotationId](#typeannotationid)
  - [getAnnotation](#getannotation)
  - [getDefaultAnnotation](#getdefaultannotation)
  - [getDescriptionAnnotation](#getdescriptionannotation)
  - [getExamplesAnnotation](#getexamplesannotation)
  - [getIdentifierAnnotation](#getidentifierannotation)
  - [getJSONSchemaAnnotation](#getjsonschemaannotation)
  - [getMessageAnnotation](#getmessageannotation)
  - [getTitleAnnotation](#gettitleannotation)
- [constructors](#constructors)
  - [anyKeyword](#anykeyword)
  - [bigIntKeyword](#bigintkeyword)
  - [booleanKeyword](#booleankeyword)
  - [composeTransformation](#composetransformation)
  - [createDeclaration](#createdeclaration)
  - [createEnums](#createenums)
  - [createFinalPropertySignatureTransformation](#createfinalpropertysignaturetransformation)
  - [createFinalTransformation](#createfinaltransformation)
  - [createLiteral](#createliteral)
  - [createPropertySignatureTransform](#createpropertysignaturetransform)
  - [createRefinement](#createrefinement)
  - [createSuspend](#createsuspend)
  - [createTemplateLiteral](#createtemplateliteral)
  - [createTuple](#createtuple)
  - [createTypeLiteral](#createtypeliteral)
  - [createTypeLiteralTransformation](#createtypeliteraltransformation)
  - [createUnion](#createunion)
  - [createUniqueSymbol](#createuniquesymbol)
  - [neverKeyword](#neverkeyword)
  - [numberKeyword](#numberkeyword)
  - [objectKeyword](#objectkeyword)
  - [stringKeyword](#stringkeyword)
  - [symbolKeyword](#symbolkeyword)
  - [undefinedKeyword](#undefinedkeyword)
  - [unknownKeyword](#unknownkeyword)
  - [voidKeyword](#voidkeyword)
- [guard](#guard)
  - [isComposeTransformation](#iscomposetransformation)
  - [isFinalPropertySignatureTransformation](#isfinalpropertysignaturetransformation)
  - [isFinalTransformation](#isfinaltransformation)
  - [isTypeLiteralTransformation](#istypeliteraltransformation)
- [guards](#guards)
  - [isAnyKeyword](#isanykeyword)
  - [isBigIntKeyword](#isbigintkeyword)
  - [isBooleanKeyword](#isbooleankeyword)
  - [isDeclaration](#isdeclaration)
  - [isEnums](#isenums)
  - [isLiteral](#isliteral)
  - [isNeverKeyword](#isneverkeyword)
  - [isNumberKeyword](#isnumberkeyword)
  - [isObjectKeyword](#isobjectkeyword)
  - [isRefinement](#isrefinement)
  - [isStringKeyword](#isstringkeyword)
  - [isSuspend](#issuspend)
  - [isSymbolKeyword](#issymbolkeyword)
  - [isTemplateLiteral](#istemplateliteral)
  - [isTransform](#istransform)
  - [isTuple](#istuple)
  - [isTypeLiteral](#istypeliteral)
  - [isUndefinedKeyword](#isundefinedkeyword)
  - [isUnion](#isunion)
  - [isUniqueSymbol](#isuniquesymbol)
  - [isUnknownKeyword](#isunknownkeyword)
  - [isVoidKeyword](#isvoidkeyword)
- [model](#model)
  - [AST (type alias)](#ast-type-alias)
  - [AnyKeyword (interface)](#anykeyword-interface)
  - [BigIntKeyword (interface)](#bigintkeyword-interface)
  - [BooleanKeyword (interface)](#booleankeyword-interface)
  - [ComposeTransformation (interface)](#composetransformation-interface)
  - [Declaration (interface)](#declaration-interface)
  - [Enums (interface)](#enums-interface)
  - [FinalPropertySignatureTransformation (interface)](#finalpropertysignaturetransformation-interface)
  - [FinalTransformation (interface)](#finaltransformation-interface)
  - [Literal (interface)](#literal-interface)
  - [LiteralValue (type alias)](#literalvalue-type-alias)
  - [NeverKeyword (interface)](#neverkeyword-interface)
  - [NumberKeyword (interface)](#numberkeyword-interface)
  - [ObjectKeyword (interface)](#objectkeyword-interface)
  - [ParseOptions (interface)](#parseoptions-interface)
  - [PropertySignatureTransform (interface)](#propertysignaturetransform-interface)
  - [PropertySignatureTransformation (type alias)](#propertysignaturetransformation-type-alias)
  - [Refinement (interface)](#refinement-interface)
  - [StringKeyword (interface)](#stringkeyword-interface)
  - [Suspend (interface)](#suspend-interface)
  - [SymbolKeyword (interface)](#symbolkeyword-interface)
  - [TemplateLiteral (interface)](#templateliteral-interface)
  - [Transform (interface)](#transform-interface)
  - [Transformation (type alias)](#transformation-type-alias)
  - [Tuple (interface)](#tuple-interface)
  - [TypeLiteral (interface)](#typeliteral-interface)
  - [TypeLiteralTransformation (interface)](#typeliteraltransformation-interface)
  - [UndefinedKeyword (interface)](#undefinedkeyword-interface)
  - [Union (interface)](#union-interface)
  - [UniqueSymbol (interface)](#uniquesymbol-interface)
  - [UnknownKeyword (interface)](#unknownkeyword-interface)
  - [VoidKeyword (interface)](#voidkeyword-interface)
  - [createTransform](#createtransform)
- [utils](#utils)
  - [Compiler (type alias)](#compiler-type-alias)
  - [Element (interface)](#element-interface)
  - [IndexSignature (interface)](#indexsignature-interface)
  - [Match (type alias)](#match-type-alias)
  - [Members (type alias)](#members-type-alias)
  - [Parameter (type alias)](#parameter-type-alias)
  - [PropertySignature (interface)](#propertysignature-interface)
  - [TemplateLiteralSpan (interface)](#templateliteralspan-interface)
  - [appendElement](#appendelement)
  - [appendRestElement](#appendrestelement)
  - [createElement](#createelement)
  - [createIndexSignature](#createindexsignature)
  - [createPropertySignature](#createpropertysignature)
  - [createRecord](#createrecord)
  - [from](#from)
  - [getCompiler](#getcompiler)
  - [getPropertySignatures](#getpropertysignatures)
  - [isParameter](#isparameter)
  - [keyof](#keyof)
  - [mergeAnnotations](#mergeannotations)
  - [mutable](#mutable)
  - [omit](#omit)
  - [partial](#partial)
  - [pick](#pick)
  - [required](#required)
  - [setAnnotation](#setannotation)
  - [to](#to)

---

# annotations

## Annotated (interface)

**Signature**

```ts
export interface Annotated {
  readonly annotations: Annotations
}
```

Added in v1.0.0

## Annotations (interface)

**Signature**

```ts
export interface Annotations {
  [_: symbol]: unknown
}
```

Added in v1.0.0

## BrandAnnotation (type alias)

**Signature**

```ts
export type BrandAnnotation = ReadonlyArray<string>
```

Added in v1.0.0

## BrandAnnotationId

**Signature**

```ts
export declare const BrandAnnotationId: typeof BrandAnnotationId
```

Added in v1.0.0

## DefaultAnnotation (type alias)

**Signature**

```ts
export type DefaultAnnotation = unknown
```

Added in v1.0.0

## DefaultAnnotationId

**Signature**

```ts
export declare const DefaultAnnotationId: typeof DefaultAnnotationId
```

Added in v1.0.0

## DescriptionAnnotation (type alias)

**Signature**

```ts
export type DescriptionAnnotation = string
```

Added in v1.0.0

## DescriptionAnnotationId

**Signature**

```ts
export declare const DescriptionAnnotationId: typeof DescriptionAnnotationId
```

Added in v1.0.0

## DocumentationAnnotation (type alias)

**Signature**

```ts
export type DocumentationAnnotation = string
```

Added in v1.0.0

## DocumentationAnnotationId

**Signature**

```ts
export declare const DocumentationAnnotationId: typeof DocumentationAnnotationId
```

Added in v1.0.0

## ExamplesAnnotation (type alias)

**Signature**

```ts
export type ExamplesAnnotation = ReadonlyArray<unknown>
```

Added in v1.0.0

## ExamplesAnnotationId

**Signature**

```ts
export declare const ExamplesAnnotationId: typeof ExamplesAnnotationId
```

Added in v1.0.0

## IdentifierAnnotation (type alias)

**Signature**

```ts
export type IdentifierAnnotation = string
```

Added in v1.0.0

## IdentifierAnnotationId

**Signature**

```ts
export declare const IdentifierAnnotationId: typeof IdentifierAnnotationId
```

Added in v1.0.0

## JSONSchemaAnnotation (type alias)

**Signature**

```ts
export type JSONSchemaAnnotation = object
```

Added in v1.0.0

## JSONSchemaAnnotationId

**Signature**

```ts
export declare const JSONSchemaAnnotationId: typeof JSONSchemaAnnotationId
```

Added in v1.0.0

## MessageAnnotation (type alias)

**Signature**

```ts
export type MessageAnnotation<A> = (a: A) => string
```

Added in v1.0.0

## MessageAnnotationId

**Signature**

```ts
export declare const MessageAnnotationId: typeof MessageAnnotationId
```

Added in v1.0.0

## TitleAnnotation (type alias)

**Signature**

```ts
export type TitleAnnotation = string
```

Added in v1.0.0

## TitleAnnotationId

**Signature**

```ts
export declare const TitleAnnotationId: typeof TitleAnnotationId
```

Added in v1.0.0

## TypeAnnotation (type alias)

**Signature**

```ts
export type TypeAnnotation = symbol
```

Added in v1.0.0

## TypeAnnotationId

**Signature**

```ts
export declare const TypeAnnotationId: typeof TypeAnnotationId
```

Added in v1.0.0

## getAnnotation

**Signature**

```ts
export declare const getAnnotation: <A>(key: symbol) => (annotated: Annotated) => Option.Option<A>
```

Added in v1.0.0

## getDefaultAnnotation

**Signature**

```ts
export declare const getDefaultAnnotation: (annotated: Annotated) => Option.Option<unknown>
```

Added in v1.0.0

## getDescriptionAnnotation

**Signature**

```ts
export declare const getDescriptionAnnotation: (annotated: Annotated) => Option.Option<string>
```

Added in v1.0.0

## getExamplesAnnotation

**Signature**

```ts
export declare const getExamplesAnnotation: (annotated: Annotated) => Option.Option<ExamplesAnnotation>
```

Added in v1.0.0

## getIdentifierAnnotation

**Signature**

```ts
export declare const getIdentifierAnnotation: (annotated: Annotated) => Option.Option<string>
```

Added in v1.0.0

## getJSONSchemaAnnotation

**Signature**

```ts
export declare const getJSONSchemaAnnotation: (annotated: Annotated) => Option.Option<object>
```

Added in v1.0.0

## getMessageAnnotation

**Signature**

```ts
export declare const getMessageAnnotation: (annotated: Annotated) => Option.Option<MessageAnnotation<unknown>>
```

Added in v1.0.0

## getTitleAnnotation

**Signature**

```ts
export declare const getTitleAnnotation: (annotated: Annotated) => Option.Option<string>
```

Added in v1.0.0

# constructors

## anyKeyword

**Signature**

```ts
export declare const anyKeyword: AnyKeyword
```

Added in v1.0.0

## bigIntKeyword

**Signature**

```ts
export declare const bigIntKeyword: BigIntKeyword
```

Added in v1.0.0

## booleanKeyword

**Signature**

```ts
export declare const booleanKeyword: BooleanKeyword
```

Added in v1.0.0

## composeTransformation

**Signature**

```ts
export declare const composeTransformation: ComposeTransformation
```

Added in v1.0.0

## createDeclaration

**Signature**

```ts
export declare const createDeclaration: (
  typeParameters: ReadonlyArray<AST>,
  type: AST,
  decode: Declaration["decode"],
  annotations?: Annotated["annotations"]
) => Declaration
```

Added in v1.0.0

## createEnums

**Signature**

```ts
export declare const createEnums: (
  enums: ReadonlyArray<readonly [string, string | number]>,
  annotations?: Annotated["annotations"]
) => Enums
```

Added in v1.0.0

## createFinalPropertySignatureTransformation

**Signature**

```ts
export declare const createFinalPropertySignatureTransformation: (
  decode: FinalPropertySignatureTransformation["decode"],
  encode: FinalPropertySignatureTransformation["encode"]
) => FinalPropertySignatureTransformation
```

Added in v1.0.0

## createFinalTransformation

**Signature**

```ts
export declare const createFinalTransformation: (
  decode: FinalTransformation["decode"],
  encode: FinalTransformation["encode"]
) => FinalTransformation
```

Added in v1.0.0

## createLiteral

**Signature**

```ts
export declare const createLiteral: (literal: LiteralValue, annotations?: Annotated["annotations"]) => Literal
```

Added in v1.0.0

## createPropertySignatureTransform

**Signature**

```ts
export declare const createPropertySignatureTransform: (
  from: PropertyKey,
  to: PropertyKey,
  propertySignatureTransformation: PropertySignatureTransformation
) => PropertySignatureTransform
```

Added in v1.0.0

## createRefinement

**Signature**

```ts
export declare const createRefinement: <From extends AST>(
  from: From,
  filter: Refinement["filter"],
  annotations?: Annotated["annotations"]
) => Transform | Refinement<From>
```

Added in v1.0.0

## createSuspend

**Signature**

```ts
export declare const createSuspend: (f: () => AST, annotations?: Annotated["annotations"]) => Suspend
```

Added in v1.0.0

## createTemplateLiteral

**Signature**

```ts
export declare const createTemplateLiteral: (
  head: string,
  spans: ReadonlyArray<TemplateLiteralSpan>,
  annotations?: Annotated["annotations"]
) => TemplateLiteral | Literal
```

Added in v1.0.0

## createTuple

**Signature**

```ts
export declare const createTuple: (
  elements: ReadonlyArray<Element>,
  rest: Option.Option<ReadonlyArray.NonEmptyReadonlyArray<AST>>,
  isReadonly: boolean,
  annotations?: Annotated["annotations"]
) => Tuple
```

Added in v1.0.0

## createTypeLiteral

**Signature**

```ts
export declare const createTypeLiteral: (
  propertySignatures: ReadonlyArray<PropertySignature>,
  indexSignatures: ReadonlyArray<IndexSignature>,
  annotations?: Annotated["annotations"]
) => TypeLiteral
```

Added in v1.0.0

## createTypeLiteralTransformation

**Signature**

```ts
export declare const createTypeLiteralTransformation: (
  propertySignatureTransformations: TypeLiteralTransformation["propertySignatureTransformations"]
) => TypeLiteralTransformation
```

Added in v1.0.0

## createUnion

**Signature**

```ts
export declare const createUnion: (candidates: ReadonlyArray<AST>, annotations?: Annotated["annotations"]) => AST
```

Added in v1.0.0

## createUniqueSymbol

**Signature**

```ts
export declare const createUniqueSymbol: (symbol: symbol, annotations?: Annotated["annotations"]) => UniqueSymbol
```

Added in v1.0.0

## neverKeyword

**Signature**

```ts
export declare const neverKeyword: NeverKeyword
```

Added in v1.0.0

## numberKeyword

**Signature**

```ts
export declare const numberKeyword: NumberKeyword
```

Added in v1.0.0

## objectKeyword

**Signature**

```ts
export declare const objectKeyword: ObjectKeyword
```

Added in v1.0.0

## stringKeyword

**Signature**

```ts
export declare const stringKeyword: StringKeyword
```

Added in v1.0.0

## symbolKeyword

**Signature**

```ts
export declare const symbolKeyword: SymbolKeyword
```

Added in v1.0.0

## undefinedKeyword

**Signature**

```ts
export declare const undefinedKeyword: UndefinedKeyword
```

Added in v1.0.0

## unknownKeyword

**Signature**

```ts
export declare const unknownKeyword: UnknownKeyword
```

Added in v1.0.0

## voidKeyword

**Signature**

```ts
export declare const voidKeyword: VoidKeyword
```

Added in v1.0.0

# guard

## isComposeTransformation

**Signature**

```ts
export declare const isComposeTransformation: (ast: Transformation) => ast is ComposeTransformation
```

Added in v1.0.0

## isFinalPropertySignatureTransformation

**Signature**

```ts
export declare const isFinalPropertySignatureTransformation: (
  ast: PropertySignatureTransformation
) => ast is FinalPropertySignatureTransformation
```

Added in v1.0.0

## isFinalTransformation

**Signature**

```ts
export declare const isFinalTransformation: (ast: Transformation) => ast is FinalTransformation
```

Added in v1.0.0

## isTypeLiteralTransformation

**Signature**

```ts
export declare const isTypeLiteralTransformation: (ast: Transformation) => ast is TypeLiteralTransformation
```

Added in v1.0.0

# guards

## isAnyKeyword

**Signature**

```ts
export declare const isAnyKeyword: (ast: AST) => ast is AnyKeyword
```

Added in v1.0.0

## isBigIntKeyword

**Signature**

```ts
export declare const isBigIntKeyword: (ast: AST) => ast is BigIntKeyword
```

Added in v1.0.0

## isBooleanKeyword

**Signature**

```ts
export declare const isBooleanKeyword: (ast: AST) => ast is BooleanKeyword
```

Added in v1.0.0

## isDeclaration

**Signature**

```ts
export declare const isDeclaration: (ast: AST) => ast is Declaration
```

Added in v1.0.0

## isEnums

**Signature**

```ts
export declare const isEnums: (ast: AST) => ast is Enums
```

Added in v1.0.0

## isLiteral

**Signature**

```ts
export declare const isLiteral: (ast: AST) => ast is Literal
```

Added in v1.0.0

## isNeverKeyword

**Signature**

```ts
export declare const isNeverKeyword: (ast: AST) => ast is NeverKeyword
```

Added in v1.0.0

## isNumberKeyword

**Signature**

```ts
export declare const isNumberKeyword: (ast: AST) => ast is NumberKeyword
```

Added in v1.0.0

## isObjectKeyword

**Signature**

```ts
export declare const isObjectKeyword: (ast: AST) => ast is ObjectKeyword
```

Added in v1.0.0

## isRefinement

**Signature**

```ts
export declare const isRefinement: (ast: AST) => ast is Refinement<AST>
```

Added in v1.0.0

## isStringKeyword

**Signature**

```ts
export declare const isStringKeyword: (ast: AST) => ast is StringKeyword
```

Added in v1.0.0

## isSuspend

**Signature**

```ts
export declare const isSuspend: (ast: AST) => ast is Suspend
```

Added in v1.0.0

## isSymbolKeyword

**Signature**

```ts
export declare const isSymbolKeyword: (ast: AST) => ast is SymbolKeyword
```

Added in v1.0.0

## isTemplateLiteral

**Signature**

```ts
export declare const isTemplateLiteral: (ast: AST) => ast is TemplateLiteral
```

Added in v1.0.0

## isTransform

**Signature**

```ts
export declare const isTransform: (ast: AST) => ast is Transform
```

Added in v1.0.0

## isTuple

**Signature**

```ts
export declare const isTuple: (ast: AST) => ast is Tuple
```

Added in v1.0.0

## isTypeLiteral

**Signature**

```ts
export declare const isTypeLiteral: (ast: AST) => ast is TypeLiteral
```

Added in v1.0.0

## isUndefinedKeyword

**Signature**

```ts
export declare const isUndefinedKeyword: (ast: AST) => ast is UndefinedKeyword
```

Added in v1.0.0

## isUnion

**Signature**

```ts
export declare const isUnion: (ast: AST) => ast is Union
```

Added in v1.0.0

## isUniqueSymbol

**Signature**

```ts
export declare const isUniqueSymbol: (ast: AST) => ast is UniqueSymbol
```

Added in v1.0.0

## isUnknownKeyword

**Signature**

```ts
export declare const isUnknownKeyword: (ast: AST) => ast is UnknownKeyword
```

Added in v1.0.0

## isVoidKeyword

**Signature**

```ts
export declare const isVoidKeyword: (ast: AST) => ast is VoidKeyword
```

Added in v1.0.0

# model

## AST (type alias)

**Signature**

```ts
export type AST =
  | Declaration
  | Literal
  | UniqueSymbol
  | UndefinedKeyword
  | VoidKeyword
  | NeverKeyword
  | UnknownKeyword
  | AnyKeyword
  | StringKeyword
  | NumberKeyword
  | BooleanKeyword
  | BigIntKeyword
  | SymbolKeyword
  | ObjectKeyword
  | Enums
  | TemplateLiteral
  // possible transformations
  | Refinement
  | Tuple
  | TypeLiteral
  | Union
  | Suspend
  // transformations
  | Transform
```

Added in v1.0.0

## AnyKeyword (interface)

**Signature**

```ts
export interface AnyKeyword extends Annotated {
  readonly _tag: "AnyKeyword"
}
```

Added in v1.0.0

## BigIntKeyword (interface)

**Signature**

```ts
export interface BigIntKeyword extends Annotated {
  readonly _tag: "BigIntKeyword"
}
```

Added in v1.0.0

## BooleanKeyword (interface)

**Signature**

```ts
export interface BooleanKeyword extends Annotated {
  readonly _tag: "BooleanKeyword"
}
```

Added in v1.0.0

## ComposeTransformation (interface)

**Signature**

```ts
export interface ComposeTransformation {
  readonly _tag: "ComposeTransformation"
}
```

Added in v1.0.0

## Declaration (interface)

**Signature**

```ts
export interface Declaration extends Annotated {
  readonly _tag: "Declaration"
  readonly typeParameters: ReadonlyArray<AST>
  readonly type: AST
  readonly decode: (
    isDecoding: boolean,
    ...typeParameters: ReadonlyArray<AST>
  ) => (input: any, options: ParseOptions, self: AST) => ParseResult.ParseResult<any>
}
```

Added in v1.0.0

## Enums (interface)

**Signature**

```ts
export interface Enums extends Annotated {
  readonly _tag: "Enums"
  readonly enums: ReadonlyArray<readonly [string, string | number]>
}
```

Added in v1.0.0

## FinalPropertySignatureTransformation (interface)

Represents a `PropertySignature -> PropertySignature` transformation

The semantic of `decode` is:

- `none()` represents the absence of the key/value pair
- `some(value)` represents the presence of the key/value pair

The semantic of `encode` is:

- `none()` you don't want to output the key/value pair
- `some(value)` you want to output the key/value pair

**Signature**

```ts
export interface FinalPropertySignatureTransformation {
  readonly _tag: "FinalPropertySignatureTransformation"
  readonly decode: (o: Option.Option<any>) => Option.Option<any>
  readonly encode: (o: Option.Option<any>) => Option.Option<any>
}
```

Added in v1.0.0

## FinalTransformation (interface)

**Signature**

```ts
export interface FinalTransformation {
  readonly _tag: "FinalTransformation"
  readonly decode: (input: any, options: ParseOptions, self: AST) => ParseResult.ParseResult<any>
  readonly encode: (input: any, options: ParseOptions, self: AST) => ParseResult.ParseResult<any>
}
```

Added in v1.0.0

## Literal (interface)

**Signature**

```ts
export interface Literal extends Annotated {
  readonly _tag: "Literal"
  readonly literal: LiteralValue
}
```

Added in v1.0.0

## LiteralValue (type alias)

**Signature**

```ts
export type LiteralValue = string | number | boolean | null | bigint
```

Added in v1.0.0

## NeverKeyword (interface)

**Signature**

```ts
export interface NeverKeyword extends Annotated {
  readonly _tag: "NeverKeyword"
}
```

Added in v1.0.0

## NumberKeyword (interface)

**Signature**

```ts
export interface NumberKeyword extends Annotated {
  readonly _tag: "NumberKeyword"
}
```

Added in v1.0.0

## ObjectKeyword (interface)

**Signature**

```ts
export interface ObjectKeyword extends Annotated {
  readonly _tag: "ObjectKeyword"
}
```

Added in v1.0.0

## ParseOptions (interface)

**Signature**

```ts
export interface ParseOptions {
  /** default "first" */
  readonly errors?: "first" | "all"
  /** default "ignore" */
  readonly onExcessProperty?: "ignore" | "error"
}
```

Added in v1.0.0

## PropertySignatureTransform (interface)

**Signature**

```ts
export interface PropertySignatureTransform {
  readonly from: PropertyKey
  readonly to: PropertyKey
  readonly propertySignatureTransformation: PropertySignatureTransformation
}
```

Added in v1.0.0

## PropertySignatureTransformation (type alias)

**Signature**

```ts
export type PropertySignatureTransformation = FinalPropertySignatureTransformation
```

Added in v1.0.0

## Refinement (interface)

**Signature**

```ts
export interface Refinement<From = AST> extends Annotated {
  readonly _tag: "Refinement"
  readonly from: From
  readonly filter: (input: any, options: ParseOptions, self: AST) => Option.Option<ParseResult.ParseError>
}
```

Added in v1.0.0

## StringKeyword (interface)

**Signature**

```ts
export interface StringKeyword extends Annotated {
  readonly _tag: "StringKeyword"
}
```

Added in v1.0.0

## Suspend (interface)

**Signature**

```ts
export interface Suspend extends Annotated {
  readonly _tag: "Suspend"
  readonly f: () => AST
}
```

Added in v1.0.0

## SymbolKeyword (interface)

**Signature**

```ts
export interface SymbolKeyword extends Annotated {
  readonly _tag: "SymbolKeyword"
}
```

Added in v1.0.0

## TemplateLiteral (interface)

**Signature**

```ts
export interface TemplateLiteral extends Annotated {
  readonly _tag: "TemplateLiteral"
  readonly head: string
  readonly spans: ReadonlyArray.NonEmptyReadonlyArray<TemplateLiteralSpan>
}
```

Added in v1.0.0

## Transform (interface)

**Signature**

```ts
export interface Transform extends Annotated {
  readonly _tag: "Transform"
  readonly from: AST
  readonly to: AST
  readonly transformation: Transformation
}
```

Added in v1.0.0

## Transformation (type alias)

**Signature**

```ts
export type Transformation = FinalTransformation | ComposeTransformation | TypeLiteralTransformation
```

Added in v1.0.0

## Tuple (interface)

**Signature**

```ts
export interface Tuple extends Annotated {
  readonly _tag: "Tuple"
  readonly elements: ReadonlyArray<Element>
  readonly rest: Option.Option<ReadonlyArray.NonEmptyReadonlyArray<AST>>
  readonly isReadonly: boolean
}
```

Added in v1.0.0

## TypeLiteral (interface)

**Signature**

```ts
export interface TypeLiteral extends Annotated {
  readonly _tag: "TypeLiteral"
  readonly propertySignatures: ReadonlyArray<PropertySignature>
  readonly indexSignatures: ReadonlyArray<IndexSignature>
}
```

Added in v1.0.0

## TypeLiteralTransformation (interface)

**Signature**

```ts
export interface TypeLiteralTransformation {
  readonly _tag: "TypeLiteralTransformation"
  readonly propertySignatureTransformations: ReadonlyArray<PropertySignatureTransform>
}
```

Added in v1.0.0

## UndefinedKeyword (interface)

**Signature**

```ts
export interface UndefinedKeyword extends Annotated {
  readonly _tag: "UndefinedKeyword"
}
```

Added in v1.0.0

## Union (interface)

**Signature**

```ts
export interface Union extends Annotated {
  readonly _tag: "Union"
  readonly types: Members<AST>
}
```

Added in v1.0.0

## UniqueSymbol (interface)

**Signature**

```ts
export interface UniqueSymbol extends Annotated {
  readonly _tag: "UniqueSymbol"
  readonly symbol: symbol
}
```

Added in v1.0.0

## UnknownKeyword (interface)

**Signature**

```ts
export interface UnknownKeyword extends Annotated {
  readonly _tag: "UnknownKeyword"
}
```

Added in v1.0.0

## VoidKeyword (interface)

**Signature**

```ts
export interface VoidKeyword extends Annotated {
  readonly _tag: "VoidKeyword"
}
```

Added in v1.0.0

## createTransform

**Signature**

```ts
export declare const createTransform: (
  from: AST,
  to: AST,
  transformation: Transformation,
  annotations?: Annotated["annotations"]
) => Transform
```

Added in v1.0.0

# utils

## Compiler (type alias)

**Signature**

```ts
export type Compiler<A> = (ast: AST) => A
```

Added in v1.0.0

## Element (interface)

**Signature**

```ts
export interface Element {
  readonly type: AST
  readonly isOptional: boolean
}
```

Added in v1.0.0

## IndexSignature (interface)

**Signature**

```ts
export interface IndexSignature {
  readonly parameter: Parameter
  readonly type: AST
  readonly isReadonly: boolean
}
```

Added in v1.0.0

## Match (type alias)

**Signature**

```ts
export type Match<A> = {
  [K in AST["_tag"]]: (ast: Extract<AST, { _tag: K }>, compile: Compiler<A>) => A
}
```

Added in v1.0.0

## Members (type alias)

**Signature**

```ts
export type Members<A> = readonly [A, A, ...Array<A>]
```

Added in v1.0.0

## Parameter (type alias)

**Signature**

```ts
export type Parameter = StringKeyword | SymbolKeyword | TemplateLiteral | Refinement<Parameter>
```

Added in v1.0.0

## PropertySignature (interface)

**Signature**

```ts
export interface PropertySignature extends Annotated {
  readonly name: PropertyKey
  readonly type: AST
  readonly isOptional: boolean
  readonly isReadonly: boolean
}
```

Added in v1.0.0

## TemplateLiteralSpan (interface)

**Signature**

```ts
export interface TemplateLiteralSpan {
  readonly type: StringKeyword | NumberKeyword
  readonly literal: string
}
```

Added in v1.0.0

## appendElement

Appends an element to a tuple or throws an exception in the following cases:

- A required element cannot follow an optional element. ts(1257)
- An optional element cannot follow a rest element. ts(1266)

**Signature**

```ts
export declare const appendElement: (ast: Tuple, newElement: Element) => Tuple
```

Added in v1.0.0

## appendRestElement

Adds a rest element to the end of a tuple, or throws an exception if the rest element is already present.

**Signature**

```ts
export declare const appendRestElement: (ast: Tuple, restElement: AST) => Tuple
```

Added in v1.0.0

## createElement

**Signature**

```ts
export declare const createElement: (type: AST, isOptional: boolean) => Element
```

Added in v1.0.0

## createIndexSignature

**Signature**

```ts
export declare const createIndexSignature: (parameter: AST, type: AST, isReadonly: boolean) => IndexSignature
```

Added in v1.0.0

## createPropertySignature

**Signature**

```ts
export declare const createPropertySignature: (
  name: PropertyKey,
  type: AST,
  isOptional: boolean,
  isReadonly: boolean,
  annotations?: Annotated["annotations"]
) => PropertySignature
```

Added in v1.0.0

## createRecord

Create a record with the specified key type and value type.

**Signature**

```ts
export declare const createRecord: (key: AST, value: AST, isReadonly: boolean) => TypeLiteral
```

Added in v1.0.0

## from

**Signature**

```ts
export declare const from: (ast: AST) => AST
```

Added in v1.0.0

## getCompiler

**Signature**

```ts
export declare const getCompiler: <A>(match: Match<A>) => Compiler<A>
```

Added in v1.0.0

## getPropertySignatures

**Signature**

```ts
export declare const getPropertySignatures: (ast: AST) => ReadonlyArray<PropertySignature>
```

Added in v1.0.0

## isParameter

**Signature**

```ts
export declare const isParameter: (ast: AST) => ast is Parameter
```

Added in v1.0.0

## keyof

Equivalent at runtime to the TypeScript type-level `keyof` operator.

**Signature**

```ts
export declare const keyof: (ast: AST) => AST
```

Added in v1.0.0

## mergeAnnotations

Adds a group of annotations, potentially overwriting existing annotations.

**Signature**

```ts
export declare const mergeAnnotations: (ast: AST, annotations: Annotated["annotations"]) => AST
```

Added in v1.0.0

## mutable

Creates a new AST with shallow mutability applied to its properties.

**Signature**

```ts
export declare const mutable: (ast: AST) => AST
```

Added in v1.0.0

## omit

Equivalent at runtime to the built-in TypeScript utility type `Omit`.

**Signature**

```ts
export declare const omit: (ast: AST, keys: ReadonlyArray<PropertyKey>) => TypeLiteral
```

Added in v1.0.0

## partial

Equivalent at runtime to the built-in TypeScript utility type `Partial`.

**Signature**

```ts
export declare const partial: (ast: AST) => AST
```

Added in v1.0.0

## pick

Equivalent at runtime to the built-in TypeScript utility type `Pick`.

**Signature**

```ts
export declare const pick: (ast: AST, keys: ReadonlyArray<PropertyKey>) => TypeLiteral
```

Added in v1.0.0

## required

Equivalent at runtime to the built-in TypeScript utility type `Required`.

**Signature**

```ts
export declare const required: (ast: AST) => AST
```

Added in v1.0.0

## setAnnotation

Adds an annotation, potentially overwriting the existing annotation with the specified id.

**Signature**

```ts
export declare const setAnnotation: (ast: AST, sym: symbol, value: unknown) => AST
```

Added in v1.0.0

## to

**Signature**

```ts
export declare const to: (ast: AST) => AST
```

Added in v1.0.0
