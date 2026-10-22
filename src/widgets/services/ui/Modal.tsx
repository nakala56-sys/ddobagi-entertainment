import { TestModal } from "../modal/TestModal";

export function Modal() {
    return process.env.NODE_ENV === "development" ? <TestModal /> : null;
}
