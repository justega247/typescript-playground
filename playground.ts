interface ITest {
  id: number;
  name?: string;
}

type TestType = {
  id: number;
  name?: string;
}

function myTest(args: ITest): string {
  if (args.name) {
    return `Hello ${args.name}`
  }
  return "Hello world"
}

myTest({ id: 1 })


// Intersection Types

// An intersection type is a way of combining multiple types into one. 
// Meaning that you can merge a given type A with a type B or more 
// and get back a single type with all properties.

// The ampersand & is used for intersection types

type LeftType = {
  id: number;
  left: string;
}

type RightType = {
  id: number;
  right: string;
}

type IntersectionType = LeftType & RightType

function showType(args: IntersectionType) {
  console.log(args)
}

showType({ id: 1, left: "test", right: "test" })
// Output: {id: 1, left: "test", right: "test"}


// Union Types

// union types allow you to have different type annotation within a given variable

type UnionType = string | number

function showUnionType(args: UnionType) {
  console.log(args)
}

showUnionType("test")
// Output: test
showUnionType(7)
// Output: 7



// Generic Types

// A generic type is a way of reusing part of a given type,
// it helps to capture types passed in as parameters

function showGenType<T>(args: T) {
  console.log(args)
}

showGenType("test")
// Output: "test"

showGenType(1)
// Output: 1

// To construct a generic type, you need to use angle brackets and pass
// a placeholder in this case T as a parameter. The placeholder value is
// up to you. Then you can call the generic type with different type annotations.
// Because it is generic - it can be reused.

interface GenericType<T> {
  id: number;
  name: T;
}

function showGeneType(args: GenericType<string>) {
  console.log(args);
}

showGeneType({ id: 1, name: "hey" })
// Output: {id: 1, name: "test"}

function showGeneTypeTwo(args: GenericType<number>) {
  console.log(args);
}

showGeneTypeTwo({ id: 90, name: 4})
// Output: {id: 1, name: 4}

interface GenericTypeTwo<T, U> {
  id: T;
  name: U;
}

function showGeneTypeThree(args: GenericTypeTwo<number, string>) {
  console.log(args);
}

showGeneTypeThree({ id: 1, name: "test"})
// Output: {id: 1, name: "test"}

function showGeneTypeFour(args: GenericTypeTwo<string, string[]>) {
  console.log(args);
}

showGeneTypeFour({id: "001", name: ["this", "is"]})
// Output: {id: "001", name: Array["this", "is"]}


// Utility Types //

// Typescript provides handy built-in utilities that help to manipulate
// types easily. To use them, you need to pass into the angle brackets <>
// the type you want to transform

// Partial (Partial<T>) **

// Partial allows you to make all properties of the type T optional. it will
// add a ? mark next to every field.

// As you can see below, we have an interface PartialType which is used as type annotation 
// for the parameters received by the function showParType(). And to make the properties 
// optional, we have to use the Partial keyword and pass in the type PartialType as 
// an argument. That said, now all fields become optional.

interface PartialType {
  id: number;
  firstName: string;
  lastName: string;
}

function showParType(args: Partial<PartialType>) {
  console.log(args);
}

showParType({ id: 1})
// Output: {id: 1}

showParType({ firstName: "Jane", lastName: "Lockette"})
// Output: { firstName: "Jane", lastName: "Lockette"}


// Required (Required<T>)

// Unlike Partial, the Required utility makes all properties of the 
// type T required.

interface RequiredType {
  id: number;
  firstName?: string
  lastName?: string
}

function showReqType(args: Required<RequiredType>) {
  console.log(args);
}

showReqType({ id: 1, firstName: "John", lastName: "Doe" })
// Output: { id: 1, firstName: "John", lastName: "Doe" }

showReqType({ id: 1 })
// Error: Type '{ id: number: }' is missing the following properties from type 'Required<RequiredType>': firstName, lastName


// Readonly(Readonly<T>)

// The Readonly utility type will transform all properties of the type T such that they
// are not reassignable to new values.

interface ReadonlyType {
  id: number;
  name: string;
}

function showReadType(args: Readonly<ReadonlyType>) {
  args.id = 4 // Cannot assign to 'id' because it is a read-only property.
  console.log(args);
}

showReadType({id: 1, name: "Doe"})
// Error: Cannot assign to 'id' because it is a read-only property.

// Besides the above, you can also use the keyword readonly in front of a property to make it not reassignable.
interface ReadonlyTypeTwo {
  readonly id: number;
  name: string
}


// Pick (Pick<T, K>)

// The Pick utility type allows you to create a new type from an existing model T by selecting some
// properties K of that type.

// Pick is a bit different from the previous utilities we have already seen. 
// It expects two parameters - T is the type you want to pick elements from and K 
// which is the property you want to select. You can also pick multiple fields 
// by separating them with a pipe(|) symbol.

interface PickType {
  id: number;
  firstName: string;
  lastName: string;
}

function showPickType(args: Pick<PickType, "firstName" | "lastName">) {
  console.log(args);
}


showPickType({ firstName: "John", lastName: "Doe" })
// Output: {firstName: "John"}

showPickType({ id: 3 })
// Error: Object literal may only specify known properties, and 'id' does not exist in type 'Pick<PickType, "firstName" | "lastName">'

// Omit (Omit<T, K>)

// The Omit utility is the opposite of the Pick type. And instead of selecting elements,
// it will remove K properties from the type T.

// This utility is similar to the way Pick works. It expects the type and the properties to omit from that type.

interface OmitType {
  id: number;
  firstName: string;
  lastName: string;
}

function showOmitType(args: Omit<OmitType, "firstName" | "lastName">) {
  console.log(args);
}

showOmitType({ id: 7 })
// Output: { id: 7}

showOmitType({ firstName: "pop" })
// Error: Object literal may only specify known properties, and 'firstName' does not exist in type 'Omit<PickType, "id">'


// Extract (Extract<T, U>)

// Extract allows you to construct a type by picking properties that are present in two
// different types. The utility with extract from T all properties that are assignable to U.

interface FirstType {
  id: number;
  firstName: string;
  lastName: string;
}

interface SecondType {
  id: number;
  address: string;
  city: string;
}

type ExtractType = Extract<keyof FirstType, keyof SecondType>
// Output: "id"

// Here, we have two types that have in common the property id. And hence by using the Extract keyword,
// we get back the field id since it's present in both interfaces. 
// And if you have more than one shared field, the utility will extract all similar properties.


// Exclude (Exclude<T, U>)

// Unlike Extract the Exclude utility will construct a type by excluding properties that are already
// present in two different types. it excludes from T all fields that are assignable to U.

interface FirstType {
  id: number;
  firstName: string;
  lastName: string;
}

interface SecondType {
  id: number;
  address: string;
  city: string;
}

type ExcludeType = Exclude<keyof FirstType, keyof SecondType>

// Output; "firstName" | "lastName"

// As you can see here, the properties firstName and lastName are assignable to the ExcludeType type 
// since they are not present in the SecondType. And by using the Extract keyword, we get back these fields as expected.


// Record (Record<Keys, Type>)

// This utility helps you to construct an object type whose property keys are "Keys"
// and whose property values are "Type". This utility can be used to map the properties
// of a type to another type.

interface CatInfo {
  age: number;
  breed: string;
}

type CatName = "miffy" | "boris" | "mordred";

const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: "Persian" },
  boris: { age: 5, breed: "Maine Coon" },
  mordred: { age: 16, breed: "British Shorthair" }
}

console.log(cats.boris)

// NonNullable (NonNullable<T>)

// This utility type allow you to remove null and undefined from the type T

type NonNullableType = string | number | null | undefined

function showNonNullType(args: NonNullable<NonNullableType>) {
  console.log(args)
}

showNonNullType("test")
// Output: "test"

showNonNullType(1)
// Output: 1

showNonNullType(null)
// Error: Argument of type 'null' is not assignable to parameter of type 'string | number'.

showNonNullType(undefined)
// Error: Argument of type 'undefined' is not assignable to parameter of type 'string | number'.


// Mapped Types

// A Mapped type is a generic type which uses union created via a "keyof" to iterate through
// the keys of one type to create another:

type StringMap<Type> = {
  [Property in keyof Type]: string;
}

function showMapType(arg: StringMap<{id: number; name: string}>) {
  console.log(arg);
}

showMapType({ id: 1, name: "Test"})
// Error: Type 'number' is not assignable to type 'string'.

showMapType({ id: "testId", name: "baloon" })
// Output: {id: "testId", name: "This is a Test"}


// Type Guards **

// Type Guards allow you to check the type of a variable or an object with an operator.
// It's a conditional block that returns a type using "typeof", "instanceof", or "in".

// typeof

function showTypeofType(x: number | string) {
  if (typeof x === "number") {
    return `The result is ${x + x}`
  }
  throw new Error(`This operation can't be done on ${typeof x}`)
}

showTypeofType("I am not a number")
// Error: This operation can't be done on a string

showTypeofType(7)
// Output: The result is 14

//instanceof

class Foo {
  bar() {
    return "Hello World"
  }
}

class Bar {
  baz = "123"
}

function showInsType(arg: Foo | Bar) {
  if (arg instanceof Foo) {
    console.log(arg.bar());
    return arg.bar()
  }

  throw new Error("The type is not supported")
}

showInsType(new Foo())
// Output: Hello World

showInsType(new Bar())
// Error: The type is not supported


// in

// The in operator allows you to check whether a property exists or not on the object received as a parameter.

interface FirstInType {
  x: number;
}

interface SecondInType {
  y: string
}

function showInType(arg: FirstInType | SecondInType) {
  if ("x" in arg) {
    console.log(`The property ${arg.x} exists`)
    return `The property ${arg.x} exists`
  }
  throw new Error("This type is not expected")
}

showInType({ x: 7 })
// Output: The property 7 exists

showInType({ y: "ccc" })
// Error: This type is not expected

// Conditional Types

// Conditional types take a form that looks a little like conditional expressions (condition ? trueExpression : falseExpression) in JavaScript:

// SomeType extends OtherType ? TrueType : FalseType;

interface Animal {
  live(): void;
}
interface Dog extends Animal {
  woof(): void;
}

type Example1 = Dog extends Animal ? number : string;
        
// type Example1 = number

type Example2 = RegExp extends Animal ? number : string;
        
// type Example2 = string