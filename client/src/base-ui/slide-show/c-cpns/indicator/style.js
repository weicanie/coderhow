import styled from 'styled-components';

const IndicatorWrapper = styled.div`
	overflow: hidden;
	width: 91px;
	position: absolute;
	left: 100px;
	top: 120px;
	transform: translate(-50%);

	.list_container {
		display: flex;
		align-items: center;
		transition: transform 0.2s;
		transform: translate(${props => props.move}px);

		.point {
			margin: 0px 2px;
			flex: 0 0 9px;
			height: 9px;
			border-radius: 50%;
			background-color: white;
			/* 
  弹性项的宽高 = base size + 伸缩。
  设置弹性项的width是在设置base width!
  base size的设置有优先级。
  若flex-basis = 0px 而width = 20px
  则base width = 0px。
   */
		}
		.curIndex {
			flex: 0 0 11px;
			height: 11px;
			margin: 0px 1px;
		}
	}
`;
export default IndicatorWrapper;
