"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.go = exports.getConstraints = exports.combineConstraints = exports.build = exports.ArbitraryHookId = void 0;
var _Function = /*#__PURE__*/require("@effect/data/Function");
var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Option"));
var _Predicate = /*#__PURE__*/require("@effect/data/Predicate");
var RA = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/ReadonlyArray"));
var AST = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/schema/AST"));
var I = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/schema/internal/common"));
var _Parser = /*#__PURE__*/require("@effect/schema/Parser");
var S = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/schema/Schema"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * @since 1.0.0
 */

/**
 * @category hooks
 * @since 1.0.0
 */
const ArbitraryHookId = I.ArbitraryHookId;
/**
 * @category arbitrary
 * @since 1.0.0
 */
exports.ArbitraryHookId = ArbitraryHookId;
const build = schema => go(schema.ast);
exports.build = build;
const record = (fc, key, value) => fc.array(fc.tuple(key, value), {
  maxLength: 2
}).map(tuples => {
  const out = {};
  for (const [k, v] of tuples) {
    out[k] = v;
  }
  return out;
});
const getHook = /*#__PURE__*/AST.getAnnotation(ArbitraryHookId);
/** @internal */
const go = (ast, constraints) => {
  switch (ast._tag) {
    case "Declaration":
      return (0, _Function.pipe)(getHook(ast), O.match(() => go(ast.type), handler => handler(...ast.typeParameters.map(p => go(p)))));
    case "Literal":
      return fc => fc.constant(ast.literal);
    case "UniqueSymbol":
      return fc => fc.constant(ast.symbol);
    case "UndefinedKeyword":
      return fc => fc.constant(undefined);
    case "VoidKeyword":
      return fc => fc.constant(undefined);
    case "NeverKeyword":
      return () => {
        throw new Error("cannot build an Arbitrary for `never`");
      };
    case "UnknownKeyword":
      return fc => fc.anything();
    case "AnyKeyword":
      return fc => fc.anything();
    case "StringKeyword":
      return fc => {
        if (constraints) {
          switch (constraints._tag) {
            case "StringConstraints":
              return fc.string(constraints.constraints);
          }
        }
        return fc.string();
      };
    case "NumberKeyword":
      return fc => {
        if (constraints) {
          switch (constraints._tag) {
            case "NumberConstraints":
              return fc.float(constraints.constraints);
            case "IntegerConstraints":
              return fc.integer(constraints.constraints);
          }
        }
        return fc.float();
      };
    case "BooleanKeyword":
      return fc => fc.boolean();
    case "BigIntKeyword":
      return fc => fc.bigInt();
    case "SymbolKeyword":
      return fc => fc.string().map(s => Symbol.for(s));
    case "ObjectKeyword":
      return fc => fc.oneof(fc.object(), fc.array(fc.anything()));
    case "TemplateLiteral":
      {
        return fc => {
          const components = [fc.constant(ast.head)];
          for (const span of ast.spans) {
            components.push(fc.string({
              maxLength: 5
            }));
            components.push(fc.constant(span.literal));
          }
          return fc.tuple(...components).map(spans => spans.join(""));
        };
      }
    case "Tuple":
      {
        const elements = ast.elements.map(e => go(e.type));
        const rest = (0, _Function.pipe)(ast.rest, O.map(RA.mapNonEmpty(e => go(e))));
        return fc => {
          // ---------------------------------------------
          // handle elements
          // ---------------------------------------------
          let output = fc.tuple(...elements.map(arb => arb(fc)));
          if (elements.length > 0 && O.isNone(rest)) {
            const firstOptionalIndex = ast.elements.findIndex(e => e.isOptional);
            if (firstOptionalIndex !== -1) {
              output = output.chain(as => fc.integer({
                min: firstOptionalIndex,
                max: elements.length - 1
              }).map(i => as.slice(0, i)));
            }
          }
          // ---------------------------------------------
          // handle rest element
          // ---------------------------------------------
          if (O.isSome(rest)) {
            const head = RA.headNonEmpty(rest.value);
            const tail = RA.tailNonEmpty(rest.value);
            output = output.chain(as => fc.array(head(fc), {
              maxLength: 2
            }).map(rest => [...as, ...rest]));
            // ---------------------------------------------
            // handle post rest elements
            // ---------------------------------------------
            for (let j = 0; j < tail.length; j++) {
              output = output.chain(as => tail[j](fc).map(a => [...as, a]));
            }
          }
          return output;
        };
      }
    case "TypeLiteral":
      {
        const propertySignaturesTypes = ast.propertySignatures.map(f => go(f.type));
        const indexSignatures = ast.indexSignatures.map(is => [go(is.parameter), go(is.type)]);
        return fc => {
          const arbs = {};
          const requiredKeys = [];
          // ---------------------------------------------
          // handle property signatures
          // ---------------------------------------------
          for (let i = 0; i < propertySignaturesTypes.length; i++) {
            const ps = ast.propertySignatures[i];
            const name = ps.name;
            if (!ps.isOptional) {
              requiredKeys.push(name);
            }
            arbs[name] = propertySignaturesTypes[i](fc);
          }
          let output = fc.record(arbs, {
            requiredKeys
          });
          // ---------------------------------------------
          // handle index signatures
          // ---------------------------------------------
          for (let i = 0; i < indexSignatures.length; i++) {
            const parameter = indexSignatures[i][0](fc);
            const type = indexSignatures[i][1](fc);
            output = output.chain(o => {
              return record(fc, parameter, type).map(d => ({
                ...d,
                ...o
              }));
            });
          }
          return output;
        };
      }
    case "Union":
      {
        const types = ast.types.map(t => go(t));
        return fc => fc.oneof(...types.map(arb => arb(fc)));
      }
    case "Lazy":
      return (0, _Function.pipe)(getHook(ast), O.match(() => {
        const get = I.memoizeThunk(() => go(ast.f()));
        return fc => fc.constant(null).chain(() => get()(fc));
      }, handler => handler()));
    case "Enums":
      {
        if (ast.enums.length === 0) {
          throw new Error("cannot build an Arbitrary for an empty enum");
        }
        return fc => fc.oneof(...ast.enums.map(([_, value]) => fc.constant(value)));
      }
    case "Refinement":
      {
        const from = go(ast.from, combineConstraints(constraints, getConstraints(ast)));
        return (0, _Function.pipe)(getHook(ast), O.match(() => fc => from(fc).filter(a => O.isNone(ast.filter(a, _Parser.defaultParseOption, ast))), handler => handler(from)));
      }
    case "Transform":
      throw new Error("cannot build an Arbitrary for transformations");
  }
};
/** @internal */
exports.go = go;
const getConstraints = ast => {
  const TypeAnnotationId = ast.annotations[AST.TypeAnnotationId];
  const jsonSchema = ast.annotations[AST.JSONSchemaAnnotationId];
  switch (TypeAnnotationId) {
    case S.GreaterThanTypeId:
    case S.GreaterThanOrEqualToTypeId:
      return {
        _tag: "NumberConstraints",
        constraints: {
          min: jsonSchema.exclusiveMinimum ?? jsonSchema.minimum
        }
      };
    case S.LessThanTypeId:
    case S.LessThanOrEqualToTypeId:
      return {
        _tag: "NumberConstraints",
        constraints: {
          max: jsonSchema.exclusiveMaximum ?? jsonSchema.maximum
        }
      };
    case S.IntTypeId:
      return {
        _tag: "IntegerConstraints",
        constraints: {}
      };
    case S.MinLengthTypeId:
      return {
        _tag: "StringConstraints",
        constraints: {
          minLength: jsonSchema.minLength
        }
      };
    case S.MaxLengthTypeId:
      return {
        _tag: "StringConstraints",
        constraints: {
          maxLength: jsonSchema.maxLength
        }
      };
  }
};
/** @internal */
exports.getConstraints = getConstraints;
const combineConstraints = (c1, c2) => {
  if (c1 === undefined) {
    return c2;
  }
  if (c2 === undefined) {
    return c1;
  }
  switch (c1._tag) {
    case "NumberConstraints":
      {
        switch (c2._tag) {
          case "NumberConstraints":
            {
              const out = {
                _tag: "NumberConstraints",
                constraints: {
                  ...c1.constraints,
                  ...c2.constraints
                }
              };
              const min = getMax(c1.constraints.min, c2.constraints.min);
              if ((0, _Predicate.isNumber)(min)) {
                out.constraints.min = min;
              }
              const max = getMin(c1.constraints.max, c2.constraints.max);
              if ((0, _Predicate.isNumber)(max)) {
                out.constraints.max = max;
              }
              return out;
            }
          case "IntegerConstraints":
            {
              const out = {
                ...c2
              };
              const min = getMax(c1.constraints.min, c2.constraints.min);
              if ((0, _Predicate.isNumber)(min)) {
                out.constraints.min = min;
              }
              const max = getMin(c1.constraints.max, c2.constraints.max);
              if ((0, _Predicate.isNumber)(max)) {
                out.constraints.max = max;
              }
              return out;
            }
        }
        break;
      }
    case "StringConstraints":
      {
        switch (c2._tag) {
          case "StringConstraints":
            {
              const out = {
                _tag: "StringConstraints",
                constraints: {
                  ...c1.constraints,
                  ...c2.constraints
                }
              };
              const min = getMax(c1.constraints.minLength, c2.constraints.minLength);
              if ((0, _Predicate.isNumber)(min)) {
                out.constraints.minLength = min;
              }
              const max = getMin(c1.constraints.maxLength, c2.constraints.maxLength);
              if ((0, _Predicate.isNumber)(max)) {
                out.constraints.maxLength = max;
              }
              return out;
            }
        }
        break;
      }
    case "IntegerConstraints":
      {
        switch (c2._tag) {
          case "NumberConstraints":
          case "IntegerConstraints":
            {
              const out = {
                ...c1
              };
              const min = getMax(c1.constraints.min, c2.constraints.min);
              if ((0, _Predicate.isNumber)(min)) {
                out.constraints.min = min;
              }
              const max = getMin(c1.constraints.max, c2.constraints.max);
              if ((0, _Predicate.isNumber)(max)) {
                out.constraints.max = max;
              }
              return out;
            }
        }
        break;
      }
  }
};
exports.combineConstraints = combineConstraints;
const getMax = (n1, n2) => n1 === undefined ? n2 : n2 === undefined ? n1 : Math.max(n1, n2);
const getMin = (n1, n2) => n1 === undefined ? n2 : n2 === undefined ? n1 : Math.min(n1, n2);
//# sourceMappingURL=Arbitrary.js.map