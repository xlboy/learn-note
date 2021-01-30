type person<T extends person<T>> = {
    data: T
}
  