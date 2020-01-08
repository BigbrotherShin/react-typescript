import React, { Dispatch, createContext, useReducer, useContext } from 'react';

// 필요한 타입들을 미리 선언

type Color = 'red' | 'orange' | 'yellow';

// 상태를 위한 타입
type State = {
  count: number;
  text: string;
  color: Color;
  isGood: boolean;
};

// 모든 액션들을 위한 타입
type Action =
  | { type: 'SET_COUNT'; count: number }
  | { type: 'SET_TEXT'; text: string }
  | { type: 'SET_COLOR'; color: Color }
  | { type: 'TOGGLE_GOOD' };

// 디스패치를 위한 타입 (Dispatch 를 리액트에서 불러올 수 있음), 액션들의 타입을 Dispatch 의 Generics로 설정
type SampleDispatch = Dispatch<Action>;

// Context 만들기
const SampleStateContext = createContext<State | null>(null);
const SampleDispatchContext = createContext<SampleDispatch | null>(null);

// 리듀서
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_COUNT':
      return {
        ...state,
        count: action.count,
      };
    case 'SET_TEXT':
      return {
        ...state,
        text: action.text,
      };
    case 'SET_COLOR':
      return {
        ...state,
        color: action.color,
      };
    case 'TOGGLE_GOOD':
      return {
        ...state,
        isGood: !state.isGood,
      };
    default:
      throw new Error('unhandled action');
  }
}

// SampleProvider 에서 useReducer를 사용하고
// SampleStateContext.Provider 와 SampleDispatchContext.Provider 로 children 을 감싸서 반환
export function SampleProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    count: 0,
    text: 'hello',
    color: 'red',
    isGood: true,
  });

  return (
    <SampleStateContext.Provider value={state}>
      <SampleDispatchContext.Provider value={dispatch}>
        {children}
      </SampleDispatchContext.Provider>
    </SampleStateContext.Provider>
  );
}

// state와 dispatch 를 쉽게 사용학 위한 커스텀 Hooks
export function useSampleState() {
  const state = useContext(SampleStateContext);
  // 커스텀 Hooks인 useSampleState 와 useSampleDispatch 에서는 null 체킹을 해주는것이 매우 중요합니다.
  if (!state) throw new Error('Cannot find SampleProvider'); // 유효하지 않을 땐 에러를 발생
  // 이를 통하여 추후 Hooks 를 사용하게 될 때 각 Hooks 함수들이 반환하는 값이 언제나 유효하다는 것을 보장 할 수 있습니다.
  return state;
}

export function useSampleDispatch() {
  const dispatch = useContext(SampleDispatchContext);
  if (!dispatch) throw new Error('Cannot finc SampleDIspatchContext');
  return dispatch;
}
