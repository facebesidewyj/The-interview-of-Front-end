/**
 * 快速排序
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

function quickSort(arr) {
    var length = arr.length;

    // 递归临界条件
    if (length <= 1) {
        return arr;
    }

    // 基准点
    var temp = arr.splice(0, 1)[0];
    var leftArr = [];
    var rightArr = [];

    for (var i = 0; i < length; i++) {
        if (temp < arr[i]) {
            rightArr.push(arr[i]);
        } else {
            leftArr.push(arr[i]);
        }
    }
    return quickSort(leftArr).concat([temp], quickSort(rightArr));
}

/**
 * 选择排序
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
 * 交换算法
 */
function swap(arr, num1, num2) {
	var temp = arr[num1];
	arr[num1] = arr[num2];
	arr[num2] = temp;
}
