import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { StateType, DispatchType } from "./store";

export const useAppDispatch = () => useDispatch<DispatchType>();
export const useAppSelector: TypedUseSelectorHook<StateType> = useSelector;
