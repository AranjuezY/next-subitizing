import { AppDispatch, RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useMounted = () => {
    const [mounted, setMounted] = useState<boolean>()

    useEffect(() => {
        setMounted(true)
    }, [])
    return mounted
}