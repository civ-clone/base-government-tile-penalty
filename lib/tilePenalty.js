"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tilePenalty = void 0;
/**
 * Under one of `Governments`, a yield of more than `threshold` loses `amount`, unless the city is celebrating.
 */
const tilePenalty = (Governments, threshold, amount = 1) => (value, government, celebrating = false) => value > threshold && !celebrating && (government === null || government === void 0 ? void 0 : government.is(...Governments))
    ? value - amount
    : value;
exports.tilePenalty = tilePenalty;
exports.default = exports.tilePenalty;
//# sourceMappingURL=tilePenalty.js.map