#include <iostream>
#include <algorithm>
#include <iomanip>
using namespace std;

void getSortedMatrix(short matrix[10][10])
{
	
	short oneDArray[100] = { 0 };
	short size = 0;
	for (short loop = 0; loop < 100; loop++)
	{
		oneDArray[loop] = rand() % SHRT_MAX;
	}
	sort(oneDArray, oneDArray + 100);
	for (short loop = 0; loop < 10; loop++)
	{
		for (short loop2 = 0; loop2 < 10; loop2++)
		{
			matrix[loop][loop2] = oneDArray[size];
			size++;
		}
	}
	
}


void printMatrix(short matrix[10][10])
{
	for (short loop = 0; loop < 10; loop++)
	{
		for (short loop2 = 0; loop2 < 10; loop2++)
		{
			cout << setw(5) << matrix[loop][loop2] << "   ";
		}
		cout << endl;
	}
}

void SortedTable(short matrix[10][10], short number)
{
	short start = 0;
	short end = 99;
	short tries = 0;

	while (start <= end)
	{
		tries++;
		short currentTry = (start + end) / 2;
		short row = (currentTry / 10) % 10;
		short col = currentTry % 10;
		cout << "Current try: " << matrix[row][col] << "\nAt Card Number: " << row * 10 + col + 1 << "\n\n";
		if (matrix[row][col] == number)
		{
			cout << number << " found in " << tries << " tries\n\n\n";
			return;
		}
		if (matrix[row][col] > number)
		{
			end = currentTry - 1;
			continue;
		}
		start = currentTry + 1;
	}
	cout << "Number does not exist in the table\n\n\n";
}

int main()
{
	srand(time(0));
	short matrix[10][10] = { 0 };
	getSortedMatrix(matrix);
	printMatrix(matrix);
	cout << "\n\n\n\n";
	SortedTable(matrix, matrix[rand() % 10][rand() % 10]);


	cin.get();
	return 0;
}
