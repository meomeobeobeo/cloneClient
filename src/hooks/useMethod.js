import { useState, useEffect, useRef } from "react";
import * as api from "../../api/index";
export default function useMethod(nameMethod) {
  //hook to get dynamic api
  // from name return method to api needed
  return api[nameMethod];
}
