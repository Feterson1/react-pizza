import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";

export const useAppDispatch: () => AppDispatch = useDispatch // Export a hook that can be reused to resolve types