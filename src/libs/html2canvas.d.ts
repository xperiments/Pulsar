/**
 * Created with JetBrains WebStorm.
 * User: xperiments
 * Date: 07/04/13
 * Time: 15:42
 * To change this template use File | Settings | File Templates.
 */
interface IHTML2canvas
{
	(element:HTMLElement, options?: IHTML2CanvasOptions):any;
	(element:HTMLElement[], options?: IHTML2CanvasOptions):any;
}
interface  IHTML2CanvasOptions
{
	allowTaint?:bool;
	background?:string;
	height?:number;
	letterRendering?:bool;
	logging?:bool;
	proxy?:string;
	taintTest?:bool;
	timeout?:number;
	width?:number;
	useCORS?:bool;
	onrendered?:(canvas:HTMLCanvasElement)=>void;
}
declare var html2canvas:IHTML2canvas;