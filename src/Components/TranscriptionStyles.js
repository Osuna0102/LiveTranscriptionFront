import styled from 'styled-components';

export const Root = styled.div`
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0;
`;

export const StatusBox = styled.div`
  position: absolute;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: #bdbdbd;
  font-size: 1em;
  line-height: 100%;
  font-family: "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", Osaka, "メイリオ", Meiryo, "ＭＳ Ｐゴシック", "MS PGothic", sans-serif;
  padding: 8px;
  border-radius: 0 10px 10px 0;
  transition: left 0.3s ease-in-out;
  left: -5%;
  &:hover {
    left: 0;
  }
`;

export const Wrapper = styled.div`
  position: fixed;
  top: 5%;
  right: 0;
  left: 0;
  overflow-y: auto;
`;

export const Container = styled.div`
  max-width: 1000%;
  position: relative;
`;

export const TranscriptContainer = styled.div`
  overflow-y: auto;
  flex-direction: column-reverse;
  align-items: left;
  height: 800px;
  color: #bdbdbd;
  padding: 16px;
  line-height: 1;
  font-family: 'Hiragino Mincho Pro', serif;
  font-size: 18px;
  writing-mode: vertical-rl;
`;

export const TranscriptLine = styled.div`
  border: 1px solid #ddd;
  padding: 8px;
  margin: 8px 0;
  border-radius: 10px;
  writing-mode: vertical-rl;
  white-space: pre-wrap;
`;

export const OptionsBox = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  text-align: right;
  color: white;
`;