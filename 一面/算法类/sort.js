/**
 * 快速排序
 * @param  {Array} arr 待排序的数组
 * @return {Array}     有序数组
 */
function quickSort(arr) {
	if (arr.length <= 1) {
		return arr;
	}

	// 基准点索引
	var middle = Math.floor(arr.length / 2);

	// 获得基准点（js中必须要取出基准点）
	var pivot = arr.splice(middle, 1)[0];

	// 声明左右两个区间
	var left = [];
	var right = [];
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] < pivot) {
			left.push(arr[i]);
		} else {
			right.push(arr[i]);
		}
	}

	return quickSort(left).concat([pivot], quickSort(right));
}

/**
 * 选择排序
 * @param  {Array} arr 待排序的数组
 * @return {Array}     有序数组
 */
function selectionSort(arr) {
	var length = arr.length;
	var minIndex = 0;

	for (var i = 0; i < length - 1; i++) {
		minIndex = i;
		for (var j = i + 1; j < length; j++) {
			if (arr[minIndex] > arr[j]) {
				minIndex = j;
			}
		}
		if (minIndex != i) {
			swap(arr, minIndex, i);
		}
	}
	return arr;
}

/**
 * 希尔排序
 * @param  {Array} arr 待排序的数组
 * @return {Array}     有序数组
 */
function shellSort(arr) {
	var length = arr.length;
	var step = 1;

	// 定义间隔区间长度
	while (step < length / 3) {
		step = step * 3 + 1;
	}

	// 循环对子序列进行插入排序
	while (step >= 1) {
		for (var i = step; i < length; i++) {
			for (var j = i; j >= step; j = j - step) {
				if (arr[j - step] > arr[j]) {
					swap(arr, j - step, j);
				}
			}
		}
		step = Math.floor(step / 3);
	}
	return arr;
}

/**
 * 交换算法
 * @param  {Array} arr  	数组
 * @param  {Number} num1 	数组索引
 * @param  {Number} num2  数组索引
 */
function swap(arr, num1, num2) {
	var temp = arr[num1];
	arr[num1] = arr[num2];
	arr[num2] = temp;
}